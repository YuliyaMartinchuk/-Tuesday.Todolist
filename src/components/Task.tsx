import React, {ChangeEvent,memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../Todolist";

export type TaskPropType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    updateTask: (taskId: string, updateTitle: string) => void
}


export const Task = memo(({
                         task,
                         removeTask,
                         changeTaskStatus,
                         updateTask
                     }: TaskPropType) => {
    console.log('Task')
    const onClickHandler = () => removeTask(task.id)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    }
    const updateTaskHandler = useCallback((updateTitle: string) => {
        updateTask(task.id, updateTitle)
    }, [updateTask, task.id])

    return (
        <li className={task.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
            <EditableSpan oldTitle={task.title}
                          callBack={updateTaskHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )

})

