import React from 'react';
import {ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

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
    return <>
        <Task
            task={{id: '1', isDone: true, title: 'CSS'}}
            removeTask={removeTaskStatusCallback}
            changeTaskStatus={changeTaskStatusStatusCallback}
            changeTaskTitle={changeTaskTitleStatusCallback}
            todolistId={'todolistID1'}/>
        <Task
            task={{id: '2', isDone: false, title: 'JS'}}
            removeTask={removeTaskStatusCallback}
            changeTaskStatus={changeTaskStatusStatusCallback}
            changeTaskTitle={changeTaskTitleStatusCallback}
            todolistId={'todolistID1'}/>
    </>
}