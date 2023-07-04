import axios, {AxiosResponse} from "axios";



const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true
    }
)


export const TodolistApi = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{ items: TodolistType }>, AxiosResponse<ResponseType<{ items: TodolistType }>>, { title: string }>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todolistId}`, {title})
    },

}

type TodolistType = {
    id: string
    title: string
    addedDate: Date
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

// type CreateTodoListsResponseType<T={items:TodolistType}> = {
//     resultCode: number
//     messages: string[]
//     data: T
// }
//
// type DeleteTodolistResponseType<T={}> = {
//     resultCode: number
//     messages: string[]
//     data: T
// }
//
// type UpdateTodolistResponseType<T={}> = {
//     resultCode: number
//     messages: string[]
//     data: T
// }
