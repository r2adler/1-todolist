import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './TodoList'
import {v1} from 'uuid'


export type FilterValuesType = "all" | "completed" | "active"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "CSS & HTML", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "Redux", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    function addTask(title: string) {
        const newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    const removeTask = (id: string)  => {
        setTasks(tasks.filter((t) => t.id !== id))
    }

    let tasksForTodoList = tasks
    if (filter === "completed") {
        tasksForTodoList = tasks.filter((t) => t.isDone === true)
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter((t) => t.isDone === false)
    }


    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
