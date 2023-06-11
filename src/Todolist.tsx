import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
}

export const  Todolist = memo((props: PropsType) => {
    console.log("Todolist")
    const removeTodolist = () => props.removeTodolist(props.todolistId)

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    let tasks = props.tasks;

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }


    const addTaskHandler = useCallback((newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    },[ props.addTask,props.todolistId])

    const updateTaskHandler = (taskID: string, updateTitle: string) => {
        props.updateTask(props.todolistId, taskID, updateTitle)
    }

    const updateTodolistTitleHandler = (updateTitle: string) => {
        props.updateTodolistTitle(props.todolistId, updateTitle)
    }

    return <div>
        <h3>

            <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <div>
            <AddItemForm callBack={addTaskHandler}/>
        </div>
        <ul>
            {
               tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(props.todolistId, t.id, newIsDoneValue);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title}
                                      callBack={(updateTitle) => updateTaskHandler(t.id, updateTitle)}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="success"
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="secondary"
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="error"
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
})


