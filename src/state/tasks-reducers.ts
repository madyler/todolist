import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi} from "../api/todolists-api";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListAT} from "./todolists-reducer";
import {Dispatch} from "redux";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

//types
type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListAT
    | SetTasksAT
    | AppActionsType

export type SetTasksAT = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: TaskType[]
}

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        case "SET-TODOLISTS": {
            let copyState = {...state}

            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "REMOVE-TASK": {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId);
            return {...state}
        }
        case "ADD-TASK": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = [{
                id: action.taskId, title: action.taskTitle, status: TaskStatuses.New,
                todoListId: action.todolistId, addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Low, startDate: ''
            }, ...todolistTasks]
            return {...state}
        }
        case "CHANGE-STATUS":
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, status: action.status}
                    : t)
            return ({...state})
        case "CHANGE-TITLE": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.taskTitle}
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

export enum ResponseStatus {
    'success',
    'error',
    'captcha' = 10
}

//actions
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (todolistId: string, taskId: string, taskTitle: string) =>
    ({type: "ADD-TASK", todolistId, taskTitle, taskId} as const)
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    ({type: "CHANGE-STATUS", todolistId, taskId, status} as const)
export const changeTaskTitleAC = (todolistId: string, taskId: string, taskTitle: string) =>
    ({type: "CHANGE-TITLE", todolistId, taskId, taskTitle} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: "SET-TASKS", tasks, todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const removeTaskTC = (todolistId: string, id: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.deleteTask(todolistId, id)
            .then(res => {
                if (res.data.resultCode === ResponseStatus.success) {
                    dispatch(removeTaskAC(todolistId, id))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === ResponseStatus.success) {
                    dispatch(addTaskAC(todolistId, res.data.data.item.id, title))
                } else {
                    handleServerAppError<{item: TaskType}>(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const changeTaskTitleTC = (todolistId: string, id: string, newTitle: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.updateTask(todolistId, id, newTitle)
            .then(res => {
                if (res.data.resultCode === ResponseStatus.success) {
                    dispatch(changeTaskTitleAC(todolistId, id, newTitle))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}