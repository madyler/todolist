import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@mui/icons-material";
import {TaskStatuses} from "./api/todolists-api";
import {TaskDomainType} from "./state/tasks-reducers";

type PropType = {
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskDomainType
    todolistId: string
}
export const Task: React.FC<PropType> = React.memo((props) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id,
            newIsDoneValue
                ? TaskStatuses.Completed
                : TaskStatuses.New
            , props.todolistId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.task.id, props.todolistId, props.changeTaskTitle])
    const x = () => {

    }

    return <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <input type="checkbox" onChange={onChangeHandler} checked={props.task.status === TaskStatuses.Completed}/>
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}
                      disabled={props.task.entityStatus==='loading'}/>
        <IconButton aria-label="delete" onClick={onClickHandler} disabled={props.task.entityStatus==='loading'}>
            <Delete/>
        </IconButton>
    </li>
})