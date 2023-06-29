import axios from "axios";


const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true
    }
)


export const TodolistApi = {
    getTodolist() {
        return instance.get('todo-lists')
    },
    createTodoLists(title:string) {
        return instance.post('todo-lists', {title})
    },
}

