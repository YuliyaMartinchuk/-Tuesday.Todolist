import {v1} from "uuid";
import {TodolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter:FilterValuesType
}

export const todolistsReducer = (state=initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "CHANGE-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        }

        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }

        case "ADD-TODOLIST": {
            const newTodolistID = action.payload.todolistId
            const newTodolist: TodolistDomainType = {id: newTodolistID, title: action.payload.newTitle, filter: "all",addedDate:"",order:0 }
            return [...state, newTodolist]
        }

        case "UPDATE-TODOLIST": {
            return  state.map(el=>el.id === action.payload.todolistId ? {...el, title: action.payload.updateTitle}:el)

        }
        case "SET-TODOLIST": {
            return action.payload.todolist.map(tl=>({...tl, filter:"all"}))
        }
        default:
            return state
    }
}

export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {type: "CHANGE-FILTER", payload: {todolistId, value}} as const}

export const updateTodolistTitleAC = (todolistId: string, updateTitle: string) => {
    return {type: "UPDATE-TODOLIST", payload: {todolistId,updateTitle}} as const}

export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", payload: {todolistId}} as const}

export const addTodoliststAC = (newTitle: string) => {
    return {type: "ADD-TODOLIST", payload: {newTitle, todolistId :v1()}} as const}

export const setTodoliststAC = (todolist: TodolistType[]) => {
    return {type: "SET-TODOLIST", payload: {todolist}} as const}


export const getTodoliststTC = () => (dispatch:Dispatch)=> {

        TodolistApi.getTodolist()
            .then((res)=>{
                dispatch(setTodoliststAC(res.data))
            })

}


type changeFilterACType = ReturnType<typeof changeFilterAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodoliststACType = ReturnType<typeof addTodoliststAC>
type updateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export type setTodoliststACType = ReturnType<typeof setTodoliststAC>

export type ActionsType = changeFilterACType
    | removeTodolistACType
    | addTodoliststACType
    | updateTodolistTitleACType
    | setTodoliststACType