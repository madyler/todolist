import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {RequestStatusType} from "./app/app-reducer";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    key: string
    entityStatus?: RequestStatusType
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addItem = () => {
        if (title.trim() !== ""){
            props.addItem(title);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(false);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>

        <TextField id="outlined-basic"
                   disabled={props.entityStatus === 'loading'}
                   error={error}
                   size="small"
                   label={error ? "Title is required" : 'Title'}
                   variant="outlined"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
        />

        <Button variant="contained"
                disabled={props.entityStatus === 'loading'}
                onClick={addItem}
                style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}>+</Button>

    </div>
})
