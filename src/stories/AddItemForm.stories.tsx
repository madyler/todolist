import React from 'react';
import {ComponentMeta} from "@storybook/react";
import {AddItemForm} from "../AddItemForm";
import {v1} from "uuid";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof AddItemForm>;

const callback = action("Button 'add' was pressed inside the form")

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback} key={v1()}/>
}