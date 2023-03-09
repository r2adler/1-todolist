import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList'
import {v1} from 'uuid'


export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'CSS & HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function addTask(title: string) {
        const newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter((t) => t.id !== id))
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => taskId === t.id)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])

    }

    let tasksForTodoList = tasks
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter((t) => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter((t) => !t.isDone)
    }


    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
