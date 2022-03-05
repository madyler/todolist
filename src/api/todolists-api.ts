import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "00adb810-fa6f-4427-8bcb-00218cb88b97"
    }
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TodolistResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

export type GetTasksResponseType = {
    error: string
    totalCount: number
    items: TaskType[]
}

export type TaskType = {
        description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string

}


export const todolistsApi = {
    getTodolists() {
        const promise = axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post<TodolistResponseType<{item:TodolistType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
        return promise
    },
    deleteTodolist(todolistID: string) {
        const promise = axios.delete<TodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
        return promise
    },
    updateTodolistTitle(todolistID: string, title: string) {
        const promise = axios.put<TodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, {title: title}, settings)
        return promise
    },
    getTasks(todolistID: string) {
        const promise = axios.get<TodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}/tasks`, settings)
        return promise
    }
}
