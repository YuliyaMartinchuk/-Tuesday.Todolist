import {AssocTaskType} from "../AppWithRedux";
import {v1} from "uuid";
import {addTodoliststACType, removeTodolistACType, setTodoliststACType} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const initialState: AssocTaskType = {}

export const tasksReducer = (state = initialState, action: ActionsType): AssocTaskType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }

        }

        case "CHANGE-STATUS": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(
                    el => el.id === action.payload.taskId ? {...el, status: action.payload.status} : el
                )
            }
        }

        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, status: TaskStatuses.New, description: "",
                priority: TaskPriorities.Low, startDate: "", deadline: "", todoListId: action.payload.todolistId, order: 0, addedDate: ""};
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }


        case "UPDATE-TASK": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(
                    el => el.id === action.payload.taskId ? {...el, title: action.payload.updateTitle} : el
                )
            }
        }

        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
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

        default:
            return state
    }
}




export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: "REMOVE-TASK",payload: {todolistId, taskId}} as const}

export const changeStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: "CHANGE-STATUS", payload: {todolistId, taskId, status}} as const}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: "ADD-TASK", payload: {todolistId, title}} as const}

export const updateTaskAC = (todolistId: string, taskId: string, updateTitle: string) => {
    return {type: "UPDATE-TASK", payload: {todolistId,taskId, updateTitle}} as const}

export type ActionsType =
    removeTaskACType
    | changeStatusACType
    | addTaskACType
    | updateTaskACType
    | addTodoliststACType
    | removeTodolistACType
    |setTodoliststACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>



