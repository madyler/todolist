import React from 'react';
import {ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof EditableSpan>;

const changeCallback = action("Value changed")


export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan onChange={changeCallback} value={'Start value'} disabled={false}/>
}