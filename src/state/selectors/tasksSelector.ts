import {AppRootStateType} from "../store";
import {TaskType} from "../../Todolist";


export const tasksSelector = (state:AppRootStateType, todolistId:string):Array<TaskType> => state.tasks[todolistId]