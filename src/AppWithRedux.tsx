import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import App from "./App";
import {keys} from "@material-ui/core/styles/createBreakpoints";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(todolistId, id)
        dispatch(action)
    }
    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }

    function removeTodolist(id: string) {
        let action = removeTodolistAC(id)
        dispatch(action)
    }
    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)
    }
    function changeTodolistTitle(id: string, title: string) {
        dispatch(changeTodolistTitleAC(id, title))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === "active")tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                        if (tl.filter === "completed")tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
