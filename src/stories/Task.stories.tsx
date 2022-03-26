import React from 'react';
import {ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export default {
    title: 'Task Component',
    component: Task,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof Task>;

const removeTaskStatusCallback = action("Task was removed")
const changeTaskStatusStatusCallback = action("Task status was changed")
const changeTaskTitleStatusCallback = action("Task title was changed")

export const TaskBaseExample = (props: any) => {
    // @ts-ignore
    return <>
        <Task
            task={{id: '1', status: TaskStatuses.Completed, title: 'CSS',
                todoListId: 'todolistId1', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: ''}}
            removeTask={removeTaskStatusCallback}
            changeTaskStatus={changeTaskStatusStatusCallback}
            changeTaskTitle={changeTaskTitleStatusCallback}
            disabled={false}
            todolistId={'todolistID1'}
        />
        <Task
            task={{id: '2', status: TaskStatuses.New, title: 'JS',
                todoListId: 'todolistId1', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: ''}}
            removeTask={removeTaskStatusCallback}
            changeTaskStatus={changeTaskStatusStatusCallback}
            changeTaskTitle={changeTaskTitleStatusCallback}
            disabled={false}
            todolistId={'todolistID1'}/>
    </>
}