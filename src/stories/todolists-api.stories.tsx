import React, {useState} from 'react'
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>()
    const getTodolists = () => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <button onClick={getTodolists}>get todolists</button>
        </div>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>()
    const [newTodolistName, setNewTodolistName] = useState<any>('')
    const createTodolist = () => {
        todolistsApi.createTodolist(newTodolistName)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'title'}
                   value={newTodolistName}
                   onChange={(e) => {
                       setNewTodolistName(e.currentTarget.value)
                   }}/>
            <button onClick={createTodolist}>create todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>()
    const [todolistID, setTodolistID] = useState<any>('')
    const deleteTodolist = () => {
        todolistsApi.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'}
                   value={todolistID}
                   onChange={(e) => {
                       setTodolistID(e.currentTarget.value)
                   }}/>
            <button onClick={deleteTodolist}>delete</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>()
    const [title, setTitle] = useState<any>('')
    const [todolistID, setTodolistID] = useState<any>('')
    const updateTodolistTitle = () => {
        todolistsApi.updateTodolistTitle(todolistID, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <div>
                <input placeholder={'todolistID'}
                       value={todolistID}
                       onChange={(e) => {
                           setTodolistID(e.currentTarget.value)
                       }}/>
            </div>
            <input placeholder={'title'}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}/>
            <button onClick={updateTodolistTitle}>update title</button>
        </div>
    </div>
}

//-------------------------------------------------------------------------------------------------------------------

export const GetTasks = () => {
    const [state, setState] = useState<any>()
    const [todolistID, setTodolistID] = useState<any>('')
    const getTasks = () => {
        todolistsApi.getTasks(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={'todolist id'}
               value={todolistID}
               onChange={(e) => {
                   setTodolistID(e.currentTarget.value)
               }}/>
        <button onClick={getTasks}>get tasks</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>()
    const [title, setTitle] = useState<any>('')
    const [todolistID, setTodolistID] = useState<any>('')
    const createTask = () => {
        todolistsApi.createTask(todolistID, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolist id'}
                   value={todolistID}
                   onChange={(e) => {
                       setTodolistID(e.currentTarget.value)
                   }}/>
        </div>
        <input placeholder={'title'}
               value={title}
               onChange={(e) => {
                   setTitle(e.currentTarget.value)
               }}/>
        <button onClick={createTask}>create task</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>()
    const [todolistID, setTodolistID] = useState<any>('')
    const [taskID, setTaskID] = useState<any>('')
    const deleteTask = () => {
        todolistsApi.deleteTask(todolistID, taskID)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <div>
                <input placeholder={'todolist id'}
                       value={todolistID}
                       onChange={(e) => {
                           setTodolistID(e.currentTarget.value)
                       }}/>
            </div>
            <input placeholder={'task id'}
                   value={taskID}
                   onChange={(e) => {
                       setTaskID(e.currentTarget.value)
                   }}/>
            <button onClick={deleteTask}>delete</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>()
    const [todolistID, setTodolistID] = useState<any>('')
    const [taskID, setTaskID] = useState<any>('')
    const [title, setTitle] = useState<any>('')
    const updateTask = () => {
        todolistsApi.updateTask(todolistID, taskID, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <div>
                <input placeholder={'todolist id'}
                       value={todolistID}
                       onChange={(e) => {
                           setTodolistID(e.currentTarget.value)
                       }}/>
            </div>
            <div>
                <input placeholder={'task id'}
                       value={taskID}
                       onChange={(e) => {
                           setTaskID(e.currentTarget.value)
                       }}/>
            </div>
            <input placeholder={'title'}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}/>
            <button onClick={updateTask}>update</button>
        </div>
    </div>
}
