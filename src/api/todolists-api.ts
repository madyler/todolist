import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "00adb810-fa6f-4427-8bcb-00218cb88b97"
    }
}

export const todolistsApi = {
    getTodolists() {
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodolist(title: string){
        const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
    return promise
    },
    deleteTodolist(todolistID: string){
     const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
        return promise
    },
    updateTodolistTitle(todolistID:string, title:string) {
       const promise =  axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`,{title: title}, settings)
    return promise
    }
}
