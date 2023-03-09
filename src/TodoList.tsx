import {FilterValuesType} from './App';
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react'


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
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: string
}

const TodoList: FC<PropsType> = (props) => {
    const {title, tasks, removeTask, changeFilter, addTask, changeStatus, filter} = props
    const [text, setText] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask(text);
            setText('')
        }
    }
    const addTaskHandler = () => {
        if (text.trim() !== '') {
            addTask(text);
            setText('')
        } else {
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={text}
                    onChange={(e) => onChangeHandler(e)}
                    onKeyDown={onEnterPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">Field is required</div>}
            </div>
            <ul>
                {
                    tasks.map((t) => (
                        <li key={t.id} className={t.isDone ? 'isDone': ''}>
                            <input type="checkbox" checked={t.isDone} onChange={() => changeStatus(t.id, !t.isDone)}/>
                            <span>{t.title}</span>
                            <button onClick={() => removeTask(t.id)}>del</button>
                        </li>
                    ))
                }
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList