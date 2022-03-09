import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducers";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import {TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

const InitialGlobalState = {
    todoLists: [
        {id: 'todolist1', title: 'What to learn', filter: 'all'},
        {id: 'todolist2', title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        ['todolist1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.New},
            {id: v1(), title: 'JS', status: TaskStatuses.New},
        ],
        ['todolist2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.New},
            {id: v1(), title: 'React book', status: TaskStatuses.New},
        ]
    }
}

export const storyBookStore = createStore(rootReducer,InitialGlobalState as AppRootStateType)

export const ReduxStoreDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}