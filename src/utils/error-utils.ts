import {setErrorAC, setErrorACType, setStatusAC, setStatusACType} from "../state/appReducer";
import {Dispatch} from "redux";


export const handleServerNetworkError  = (dispatch:ErrorUtilsDispatchType, error:string) => {
    dispatch(setErrorAC(error))
    dispatch(setStatusAC("failed"))
}

type ErrorUtilsDispatchType = Dispatch<setStatusACType | setErrorACType>