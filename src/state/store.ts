import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducers";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store