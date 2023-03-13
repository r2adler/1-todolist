import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList'
import {v1} from 'uuid'


export type FilterValuesType = 'all' | 'completed' | 'active'

type  Todolist = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todolists, setTodoLists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'},
    ])

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'CSS & HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    })

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todolists])
        }
    }

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter((t) => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => taskId === t.id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj});
        }
    }
    const removeTodolist = (taskId: string) => {
        let filteredTodolist = todolists.filter(t => t.id !== taskId)
        setTodoLists(filteredTodolist)
        delete tasksObj[taskId]
        setTasks({...tasksObj})
    }


    return (
        <div className="App">
            {
                todolists.map(t => {
                    let tasksForTodoList = tasksObj[t.id]
                    if (t.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter((t) => t.isDone)
                    }
                    if (t.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone)
                    }

                    return <TodoList
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={t.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
