import React, {useEffect, useState} from "react";
import {TodolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "NEW TITLE"
        TodolistApi.createTodoLists(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "81ee1df0-e192-45db-8265-9839ff2ff23f"
        TodolistApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}



export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "5cab166d-593e-4982-a5fe-c3a3e2d55f21"
        const title = "UPDATE TITLE"
        TodolistApi.updateTodolist(todolistId,title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}