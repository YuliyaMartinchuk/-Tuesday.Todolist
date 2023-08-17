import {AssocTaskType} from "../AppWithRedux";
import {addTodoliststACType, removeTodolistACType, setTodoliststACType} from "./todolistsReducer";
import { TaskStatuses, TaskType, TodolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import { setStatusAC} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: AssocTaskType = {}

export const tasksReducer = (state = initialState, action: ActionsType): AssocTaskType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }}
        case "CHANGE-STATUS": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(
                    el => el.id === action.payload.taskId ? {...el, status: action.payload.status} : el
                )}}
        case "ADD-TASK": {

            return {...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]}
        }
        case "UPDATE-TASK": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(
                    el => el.id === action.payload.taskId ? {...el, title: action.payload.updateTitle} : el
                )}}
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        case "SET-TODOLIST":{
            const stateCopy = {...state}
            action.payload.todolist.forEach((tl)=>{
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASK":{
            return {...state, [action.payload.todolistId]:action.payload.tasks}
        }

        default:
            return state
    }
}




export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: "REMOVE-TASK",payload: {todolistId, taskId}} as const}

export const changeStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: "CHANGE-STATUS", payload: {todolistId, taskId, status}} as const}

export const addTaskAC = (task:TaskType) => {
    return {type: "ADD-TASK", payload: {task}} as const}

export const updateTaskAC = (todolistId: string, taskId: string, updateTitle: string) => {
    return {type: "UPDATE-TASK", payload: {todolistId,taskId, updateTitle}} as const}

export const setTaskAC  = (todolistId: string, tasks: TaskType[])=> {
    return {type: "SET-TASK", payload: {todolistId, tasks}} as const}


export const getTaskTC = (todolistId:string) => (dispatch:Dispatch)=> {
    dispatch(setStatusAC("loading"))
    TodolistApi.getTasks(todolistId)
        .then((res)=> {
            dispatch(setTaskAC(todolistId, res.data.items))
            dispatch(setStatusAC("succeeded"))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch:Dispatch) => {
    dispatch(setStatusAC("loading"))
    TodolistApi.deleteTasks(todolistId,taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId,taskId))
            dispatch(setStatusAC("succeeded"))
        })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch:Dispatch) => {
    dispatch(setStatusAC("loading"))
    TodolistApi.createTasks(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === Result_Code.OK ) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setStatusAC("succeeded"))
            }
           else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error)=> {
            handleServerNetworkError(dispatch, error.message)
        })
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch:Dispatch, getState: ()=>AppRootStateType) => {
    dispatch(setStatusAC("loading"))
    const task = getState().tasks[todolistId].find(t => t.id === taskId)

    if (task) {
        const model:UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status
        }
        TodolistApi.updateTasks(todolistId,taskId, model)
            .then((res) => {
                if (res.data.resultCode === Result_Code.OK) {
                    dispatch(changeStatusAC(todolistId,taskId, status))
                    dispatch(setStatusAC("succeeded"))
                }
                else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((error) => {
                handleServerNetworkError(dispatch, error.message)
            })
    }
}

export enum Result_Code {
    OK = 0,
    ERROR = 1,
    CAPTCHA_ERROR = 10
}



export type ActionsType =
    removeTaskACType
    | changeStatusACType
    | addTaskACType
    | updateTaskACType
    | addTodoliststACType
    | removeTodolistACType
    |setTodoliststACType
    |setTaskACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type setTaskACType = ReturnType<typeof setTaskAC>



