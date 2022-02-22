import React from 'react';
import {ComponentMeta} from "@storybook/react";
import {AddItemForm} from "../AddItemForm";
import {v1} from "uuid";
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

//const callback = action("Button 'add' was pressed inside the form")

export const TaskBaseExample = (props: any) => {
    return <Task task={} removeTask={} changeTaskStatus={} changeTaskTitle={} todolistId={}/>
}