import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType,
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string,
}
export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [...todolists, {id: action.todolistId, title: action.title, filter: 'all'}];
        case "CHANGE-TODOLIST-FILTER":
            let todolist = todolists.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            };
            return [...todolists]
        case "CHANGE-TODOLIST-TITLE":
            let todolist1 = todolists.find(tl => tl.id === action.id);
            if (todolist1) {
                // если нашёлся - изменим ему заголовок
                todolist1.title = action.title;
            }
                return [...todolists]
        default:
            throw new Error('incorrect todolists reducer action type')
    }
}

export const removeTodolistAC = (id: string):RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", id}
}
export const addTodolistAC = (title: string):AddTodoListAT => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string):ChangeTodoListTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType):ChangeTodoListFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}