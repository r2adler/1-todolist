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
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: string
    id: string
    removeTodolist: (taskId: string) => void
}

const TodoList: FC<PropsType> = (props) => {
    const {title, tasks, removeTask, changeFilter, addTask, changeStatus, id, filter, removeTodolist} = props
    const [text, setText] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            if (text.trim() !== '') {
                addTask(text, id);
                setText('')
            } else {
                setError('Title is required')
            }
        }
    }
    const addTaskHandler = () => {
        if (text.trim() !== '') {
            addTask(text, id);
            setText('')
        } else {
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => changeFilter('all', id)
    const onActiveClickHandler = () => changeFilter('active', id)
    const onCompletedClickHandler = () => changeFilter('completed', id)


    return (
        <div>
            <h3>{title}
                <button onClick={() => removeTodolist(id)}>x</button>
            </h3>
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
                        <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={() => changeStatus(t.id, !t.isDone, id)}/>
                            <span>{t.title}</span>
                            <button onClick={() => removeTask(t.id, id)}>del</button>
                        </li>
                    ))
                }
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                >
                    Active
                </button>
                <button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                >Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList