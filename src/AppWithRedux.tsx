import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {v1} from "uuid";
import {TaskStatuses, TaskType, todolistsApi} from "./api/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const AppWithRedux = React.memo(() => {

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const removeTask = useCallback((id: string, todolistId: string) => {
        todolistsApi.deleteTask(todolistId, id)
            .then(res=>{
                dispatch(removeTaskAC(todolistId, id))
            })
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        todolistsApi.createTask(todolistId, title)
            .then(res=>{
                console.log(res.data)
                dispatch(addTaskAC(todolistId, 'res.data.data', title))
            })
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, id, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        todolistsApi.updateTask(todolistId, id, newTitle)
            .then(res=>{
                console.log(todolistId, id, newTitle)
                dispatch(changeTaskTitleAC(todolistId, id, newTitle))
            })
    }, [dispatch])

    //---------------------------------------------------------------------------------------------------------------

    const removeTodolist = useCallback((id: string) => {
        todolistsApi.deleteTodolist(id)
            .then(res=>{
                dispatch(removeTodolistAC(id))
            })
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        todolistsApi.createTodolist(title)
            .then(res=>{
                console.log(res.data.data.item.id)
                dispatch(addTodolistAC(title, res.data.data.item.id))
            })
    }, [dispatch])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        todolistsApi.updateTodolistTitle(id, title)
            .then(res=>{
                dispatch(changeTodolistTitleAC(id, title))
            })
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
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
})
