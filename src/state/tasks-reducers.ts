import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskAT = {
    type: "ADD-TASK"
    todolistId: string
    taskTitle: string
}
export type ChangeTaskStatusAT = {
    type: "CHANGE-STATUS"
    todolistId: string
    taskId: string
    isDone: boolean
}
export type ChangeTaskTitleAT = {
    type: "CHANGE-TITLE"
    todolistId: string
    taskId: string
    taskTitle: string
}
type ActionType = RemoveTaskAT | AddTaskAT |
    ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId);
            return {...state}
        }
        case "ADD-TASK": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = [{id: v1(), title: action.taskTitle, isDone: false}, ...todolistTasks]
            return {...state}
        }
        case "CHANGE-STATUS":
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t)
            return ({...state})
        case "CHANGE-TITLE": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map( t => t.id === action.taskId
                ?{...t, title: action.taskTitle}
                : t)
            return ({...state})
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy//{...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            delete state[action.id]
            return {...state}
        }
        default:
            return state
            //throw new Error('incorrect task reducer action type')
    }
}

export const removeTaskAC = (todolistId: string, taskId: string):RemoveTaskAT => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (todolistId: string, taskTitle: string):AddTaskAT => {
    return {type: "ADD-TASK", todolistId, taskTitle}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean):ChangeTaskStatusAT => {
    return {type: "CHANGE-STATUS", todolistId, taskId, isDone}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, taskTitle: string):ChangeTaskTitleAT  => {
    return {type: "CHANGE-TITLE", todolistId, taskId, taskTitle}
}