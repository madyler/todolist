import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {addTaskTC, changeTaskStatusAC, changeTaskTitleTC, removeTaskTC, TaskDomainType} from "./state/tasks-reducers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "./state/store";
import {v1} from "uuid";
import {TaskStatuses} from "./api/todolists-api";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app/app-reducer";
import LinearProgress from '@mui/material/LinearProgress';


export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}


export const AppWithRedux = React.memo(() => {

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, id, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleTC(todolistId, id, newTitle))
    }, [dispatch])

    //---------------------------------------------------------------------------------------------------------------

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])


    return (
        <div>
            <div className="App">
                <ButtonAppBar/>
                <Container fixed>
                    {status === "loading" && <LinearProgress color={"secondary"}/>}
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={addTodolist} key={v1()}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todoLists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px', backgroundColor: "#E4EAF4"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        entityStatus={tl.entityStatus}
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
            <ErrorSnackbar/>
        </div>
    );
})
