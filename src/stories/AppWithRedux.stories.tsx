import React from 'react';
import {ComponentMeta} from "@storybook/react";
import {AppWithRedux} from "../AppWithRedux";
import {ReduxStoreDecorator} from "./ReduxStoreDecorator";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreDecorator],
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof AppWithRedux>;


export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux />
}