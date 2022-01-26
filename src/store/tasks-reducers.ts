import {TasksStateType} from "../App";
import {v1} from "uuid";
import {throws} from "assert";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
    ChangeTaskStatusAT | ChangeTaskTitleAT

export const TasksReducers = (tasks: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            let todolistTasks = tasks[action.todolistId];
            tasks[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId);
            return {...tasks}
        case "ADD-TASK":
            let todolistTasks1 = tasks[action.todolistId]
            tasks[action.todolistId] = [{id: v1(), title: action.taskTitle, isDone: false}, ...todolistTasks1]
            return {...tasks}
        case "CHANGE-STATUS":
            let task = tasks[action.todolistId].find(t => t.id === action.taskId)
            if (task) task.isDone = action.isDone;
            return {...tasks}
        case "CHANGE-TITLE":
            let todolistTasks3 = tasks[action.todolistId]
            let task1 = todolistTasks3.find(t => t.id === action.taskId)
            if (task1) task1.title = action.taskTitle
            return {...tasks}
        default:
            throw new Error('incorrect task reducer action type')
    }
}