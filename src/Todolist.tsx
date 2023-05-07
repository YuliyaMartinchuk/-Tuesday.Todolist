import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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
    changeFilter: (todolistId: string, value: FilterValuesType ) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    updateTask:(todolistId: string,taskId: string,updateTitle:string)=>void
    updateTodolistTitle:(todolistId: string,updateTitle:string)=>void
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.todolistId)

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId,"active");
    const onCompletedClickHandler = () => props.changeFilter( props.todolistId,"completed");

    const addTaskHandler=(newTitle:string)=>{
        props.addTask(props.todolistId, newTitle)
    }

    const updateTaskHandler=(taskID:string,updateTitle:string)=>{
        props.updateTask(props.todolistId,taskID,updateTitle)
    }

    const updateTodolistTitleHandler=(updateTitle:string)=>{
        props.updateTodolistTitle(props.todolistId,updateTitle)
    }

    return <div>
        <h3>

            <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <div>
            <AddItemForm  callBack={addTaskHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(props.todolistId, t.id, newIsDoneValue);
                    }

                    // const updateTaskHandler=(updateTitle:string)=>{
                    //     props.updateTask(props.todolistId,t.id,updateTitle)
                    // }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan oldTitle={t.title} callBack={(updateTitle)=>updateTaskHandler(t.id,updateTitle)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


