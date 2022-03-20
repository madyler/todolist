import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducers";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer
})

const InitialGlobalState = {
    todoLists: [
        {id: 'todolist1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolist2', title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ],
    tasks: {
        ['todolist1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.New,
                todoListId: 'todolistId1', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.New,
                todoListId: 'todolistId1', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: ''
            },
        ],
        ['todolist2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.New,
                todoListId: 'todolistId2', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: ''
            },
            {
                id: v1(), title: 'React book', status: TaskStatuses.New,
                todoListId: 'todolistId2', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: ''
            },
        ]
    },
    app: {status: 'loading',
        error: null
    }
}

export const storyBookStore = createStore(rootReducer, InitialGlobalState as AppRootStateType)

export const ReduxStoreDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}