import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducers'
import {TasksStateType} from "../AppWithRedux";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                todoListId: 'todolistId1', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: '', entityStatus: "idle"
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'todolistId1', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: '', entityStatus: "idle"
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New,
                todoListId: 'todolistId1', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: '', entityStatus: "idle"
            },
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New,
                todoListId: 'todolistId2', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: '', entityStatus: "idle"
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed,
                todoListId: 'todolistId2', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: '', entityStatus: "idle"
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New,
                todoListId: 'todolistId2', addedDate: '', completed: false, deadline: '', description: '',
                order: 0, priority: TaskPriorities.Hi, startDate: '', entityStatus: "idle"
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        id: '1', title: 'juice', status: TaskStatuses.New,
        todoListId: 'todolistId2', addedDate: '', completed: false, deadline: '', description: '',
        order: 0, priority: TaskPriorities.Hi, startDate: ''
    })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)

})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.New)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)

})

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC('todolistId2', '2', 'Milky-way')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Milky-way')
    expect(endState['todolistId1'][1].title).toBe('JS')

})

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodolistAC('title no matter', 'todolistId')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})

test('tasks should', () => {
    const action = setTasksAC(startState['todolistId1'], 'todolistId1')
    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})