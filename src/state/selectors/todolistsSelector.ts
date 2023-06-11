import {AppRootStateType} from "../store";
import {TodolistType} from "../../AppWithRedux";


export const todoliststsSelector = (state:AppRootStateType): TodolistType[] => state.todolists