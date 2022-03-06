import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "00adb810-fa6f-4427-8bcb-00218cb88b97"
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
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

type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistsApi = {
    getTodolists() {
        const promise = instance.get<TodolistType[]>('todo-lists')
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
        return promise
    },
    deleteTodolist(todolistID: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistID}`)
        return promise
    },
    updateTodolistTitle(todolistID: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistID}`, {title: title})
        return promise
    },

//-------------------------------------------------------------------------------------------------------------------

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, title: string, isDone: 0|1) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title, status: isDone})
    }
}
