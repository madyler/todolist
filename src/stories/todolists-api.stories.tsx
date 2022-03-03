import React, {useEffect, useState} from "react";
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '00adb810-fa6f-4427-8bcb-00218cb88b97'
    }
}

export const GetTodoLists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/auth/me', settings)
            .then((res) => {
                debugger
            })
    })
}
