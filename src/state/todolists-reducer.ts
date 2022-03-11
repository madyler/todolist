import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";


export type ActionType =
    | RemoveTodoListAT
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | AddTodoListAT
    | ReturnType<typeof setTodolistAC>

export type AddTodoListAT = ReturnType<typeof addTodolistAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodolistAC>

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLIST":
            return action.todolists.map((t)=>{})
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state];
        case "CHANGE-TODOLIST-FILTER":
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        case "CHANGE-TODOLIST-TITLE":
            let todolist1 = state.find(tl => tl.id === action.id);
            if (todolist1) {
                todolist1.title = action.title;
            }
            return [...state]
        default:
            return state
        //throw new Error('incorrect todoLists reducer action type')
    }
}

export const removeTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", id} as const
}
export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} as const
}
export const setTodolistAC = (todolists: Array<TodolistType>) => {
    return {type: "SET-TODOLIST",todolists} as const
}