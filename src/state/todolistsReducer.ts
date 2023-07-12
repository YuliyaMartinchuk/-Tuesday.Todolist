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
            return [{...action.payload.todolist, filter:"all"},...state]
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

export const addTodoliststAC = (todolist: TodolistType) => {
    return {type: "ADD-TODOLIST", payload: {todolist}} as const}

export const setTodoliststAC = (todolist: TodolistType[]) => {
    return {type: "SET-TODOLIST", payload: {todolist}} as const}


export const getTodoliststTC = () => (dispatch:Dispatch)=> {
        TodolistApi.getTodolist()
            .then((res)=>{
                dispatch(setTodoliststAC(res.data))
            })
}


export const deleteTodolistTC = (todolistId: string) => (dispatch:Dispatch) => {
    TodolistApi.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const createTodolistTC = (newTitle: string) => (dispatch:Dispatch) => {
    TodolistApi.createTodoLists(newTitle)
        .then((res)=>{
            dispatch(addTodoliststAC(res.data.data.item))
        })
}

export const changeTodolistTC = (todolistId: string, updateTitle: string) => (dispatch:Dispatch) => {
    TodolistApi.updateTodolist(todolistId, updateTitle)
        .then((res) => {
            dispatch(updateTodolistTitleAC(todolistId, updateTitle))
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