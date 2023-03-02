import {FilterValuesType} from "./App";
import {useState} from "react";
import React from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

function TodoList(props: PropsType) {
    const [text, setText] = useState('')

    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const onEnterPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask(text);
            setText('')
        }
    }
    const addTaskHandler = () => {
        addTask(text);
        setText('')
    }
    const onAllClickHandler = () => changeFilter("all")
    const onActiveClickHandler = () => changeFilter("active")
    const onCompletedClickHandler = () => changeFilter("completed")

    const {title, tasks, removeTask, changeFilter, addTask} = props

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={text}
                    onChange={(e) => onNewTitleChangeHandler(e)}
                    onKeyDown={onEnterPressHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map((el) => (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={() => removeTask(el.id)}>del</button>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList