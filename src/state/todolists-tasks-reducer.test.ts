import {TasksStateType} from "../AppWithRedux";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducers";

test('ids should be equals',()=>{
    const startTasksState: TasksStateType ={}
    const startTodolistsState: Array<TodolistDomainType> = []
    const action = addTodolistAC('new todolist', 'todolistId')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodolistsState, action)
    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodoLists).toBe(action.todolistId)
})