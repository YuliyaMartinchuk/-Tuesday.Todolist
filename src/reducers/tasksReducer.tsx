import {AssocTaskType} from "../App";
import {v1} from "uuid";
import {addTodoliststAC,removeTodolistAC} from "./todolistsReducer";

export const tasksReducer = (state: AssocTaskType, action: TsarType):AssocTaskType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            // setTasks({...tasks,[todolistId]:tasks[todolistId].filter(el=>el.id!==taskId)})
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].filter(el=>el.id!==action.payload.taskId)}

        }

        case "CHANGE-STATUS": {
            // setTasks({...tasks, [todolistId]:tasks[todolistId].map(el=>el.id === taskId? {...el, isDone} : el)})
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(
                el=>el.id===action.payload.taskId? {...el, isDone:action.payload.isDone} : el
                )}
        }

        case "ADD-TASK": {
            //let newTask = {id: v1(), title: title, isDone:false};
            // setTasks({...tasks, [todolistId]:[newTask,...tasks[todolistId]]})
            let newTask = {id: v1(), title: action.payload.title, isDone:false};
            return {...state, [action.payload.todolistId]: [newTask,...state[action.payload.todolistId]]}
        }


        case "UPDATE-TASK": {
            // setTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId ? {...el, title:updateTitle} :el)})
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].map(
                el => el.id === action.payload.taskId ? {...el, title: action.payload.updateTitle}: el
                )
        }}

        case "ADD-TODOLIST": {
            //const newTodolistID = v1()
            //const newTodolist: TodolistType = {id: newTodolistID, title: newTitle, filter: "all"}
            // setTodolists([newTodolist, ...todolists])
            // setTasks({...tasks,[newTodolistID]:[]})
            return {...state, [action.payload.newTodolistID]:[]}
        }

        case "REMOVE-TODOLIST": {
            // setTodolists(todolists.filter(el=>el.id!== todolistId))
            // delete tasks[todolistId]
            delete state[action.payload.todolistId]
        }


        default:
            return state
    }
}

export type TsarType = removeTaskAC | changeStatusAC | addTaskAC | addTodoliststAC | updateTaskAC | removeTodolistAC

type removeTaskAC = ReturnType<typeof removeTaskAC>
type changeStatusAC = ReturnType<typeof changeStatusAC>
type addTaskAC = ReturnType<typeof addTaskAC>
type updateTaskAC = ReturnType<typeof updateTaskAC>

type addTodoliststAC = ReturnType<typeof addTodoliststAC>
type removeTodolistAC = ReturnType<typeof removeTodolistAC>


export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK" ,// string
        payload: {todolistId,
            taskId}
    } as const
}

export const changeStatusAC = (todolistId: string, taskId: string, isDone: boolean ) => {
    return {
        type: "CHANGE-STATUS" ,
        payload: {todolistId,
            taskId,
            isDone
        }
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: "ADD-TASK" ,
        payload: {todolistId,
            title}
    } as const
}

export const updateTaskAC = (todolistId: string,taskId: string,updateTitle:string) => {
    return {
        type: "UPDATE-TASK" ,
        payload: {todolistId,
            taskId,
            updateTitle
        }
    } as const
}



