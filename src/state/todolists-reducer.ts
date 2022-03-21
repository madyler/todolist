import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {AxiosError} from "axios";


export type ActionType =
    SetTodoListAT
    | RemoveTodoListAT
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | AddTodoListAT
    | ReturnType<typeof setTodolistAC>
    | AppActionsType
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type AddTodoListAT = ReturnType<typeof addTodolistAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodolistAC>
export type SetTodoListAT = ReturnType<typeof setTodolistAC>

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map(t => {
                return {...t, filter: 'all', entityStatus: "idle"}
            })
        }
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: "idle"
            }, ...state];
        case "CHANGE-TODOLIST-FILTER":{
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-TITLE":{
            let todolist1 = state.find(tl => tl.id === action.id);
            if (todolist1) {
                todolist1.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS":{
            return state.map((tl)=>(
                tl.id===action.id
                ? {...tl, entityStatus: action.entityStatus}
                : tl)
            )
        }
        default:
            return state
        //throw new Error('incorrect todoLists reducer action type')
    }
}

export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (title: string, todolistId: string) => ({type: "ADD-TODOLIST", title, todolistId} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
} as const)
export const setTodolistAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus:RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
}as const)

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.getTodolists()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
            })
            .catch((err) => {
                dispatch(setAppErrorAC(err[0]))
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const removeTodolistTC = (id: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(changeTodolistEntityStatusAC(id, "loading"))
        dispatch(setAppStatusAC('loading'))
        todolistsApi.deleteTodolist(id)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(id))
                } else {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                }
            })
            .catch((err) => {
                dispatch(setAppErrorAC(err[0]))
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(title, res.data.data.item.id))
                } else {
                    if (res.data.messages.length > 0) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred.'))
                    }
                }
            })
            .catch((err: AxiosError) => {
                dispatch(setAppErrorAC(err.message))
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.updateTodolistTitle(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(id, title))
                } else {
                    if (res.data.messages.length > 0) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred.'))
                    }
                }
            })
            .catch((err: AxiosError) => {
                dispatch(setAppErrorAC(err.message))
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}