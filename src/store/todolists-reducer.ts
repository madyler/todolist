import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
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
            let newTodolistId = v1();
            return [...todolists, {id: newTodolistId, title: action.title, filter: 'all'}];
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

export const RemoveTodoListAC = (id: string):RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", id}
}
export const AddTodoListAC = (title: string):AddTodoListAT => {
    return {type: "ADD-TODOLIST", title}
}
export const ChangeTodoListTitleAC = (id: string, title: string):ChangeTodoListTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType):ChangeTodoListFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}