import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type PropType = {
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task: React.FC<PropType> = React.memo((props) => {
    console.log('Task')
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.task.id, props.todolistId, props.changeTaskTitle])

    return <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <input type="checkbox" onChange={onChangeHandler} checked={props.task.isDone}/>
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>
})