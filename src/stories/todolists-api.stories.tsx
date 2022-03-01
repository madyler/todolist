import React, {useEffect, useState} from "react";
import axios from "axios";

export default {
    title: 'API'
}

export const GetTodoLists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists')
            .then((res) => {
                debugger
            })
    })
}
