import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {IconButton} from "@material-ui/core";
import {Delete} from "@mui/icons-material";
import {Button, ButtonGroup} from "@mui/material";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTodolist: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTaskTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter]);

    let tasksForTodolist = props.tasks

    if (props.filter === "active") tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    if (props.filter === "completed") tasksForTodolist = props.tasks.filter(t => t.isDone === true)


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask} key={props.id}/>
        <div>
            <ButtonGroup>
                <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="success"
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="success"
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="success"
                        onClick={onCompletedClickHandler}>Completed</Button>
            </ButtonGroup>

        </div>
        <ul>
            {
                tasksForTodolist.map(t => <Task changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                                                removeTask={props.removeTask}
                                                task={t}
                                                todolistId={props.id}
                                                key={t.id}
                    />
                )
            }
        </ul>
    </div>
})