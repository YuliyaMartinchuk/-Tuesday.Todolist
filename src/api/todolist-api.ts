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
   deleteTodolist(todolistId:string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
   updateTodolist(todolistId:string, title:string) {
        return instance.put(`todo-lists/${todolistId}`,{title} )
    },

}

