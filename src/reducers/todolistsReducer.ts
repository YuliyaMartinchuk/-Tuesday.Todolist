import { FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";



export const todolistsReducer = (state: TodolistType[], action: TsarType): TodolistType[] => {
    switch (action.type) {
        case "CHANGE-FILTER": {
            //setTodolists(todolists.map(el=>el.id===todolistId ? {...el,filter:value}:el))
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        }

        case "REMOVE-TODOLIST": {
            // setTodolists(todolists.filter(el=>el.id!== todolistId))
            // delete tasks[todolistId]
            return state.filter(el => el.id !== action.payload.todolistId)
        }

        case "ADD-TODOLIST": {
            //const newTodolistID = v1()
            //const newTodolist: TodolistType = {id: newTodolistID, title: newTitle, filter: "all"}
            // setTodolists([newTodolist, ...todolists])
            // setTasks({...tasks,[newTodolistID]:[]})
            const newTodolistID = action.payload.todolistId
            const newTodolist: TodolistType = {id: newTodolistID, title: action.payload.newTitle, filter: "all"}
            return [...state, newTodolist]
        }

        case "UPDATE-TODOLIST": {
            // setTodolists(todolists.map(el=>el.id===todolistId ? {...el,title:updateTitle}:el))
            return  state.map(el=>el.id === action.payload.todolistId ? {...el, title: action.payload.updateTitle}:el)

        }

        default:
            return state
    }
}

export type TsarType = changeFilterACType | removeTodolistACType | addTodoliststACType | updateTodolistTitleACType

type changeFilterACType = ReturnType<typeof changeFilterAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodoliststACType = ReturnType<typeof addTodoliststAC>
type updateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>


export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            todolistId,
            value
        }
    } as const
}

export const updateTodolistTitleAC = (todolistId: string, updateTitle: string) => {
    return {
        type: "UPDATE-TODOLIST",
        payload: {
            todolistId,
            updateTitle
        }
    } as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId
        }
    } as const
}

export const addTodoliststAC = (newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTitle,
            todolistId :v1()
        }
    } as const
}


