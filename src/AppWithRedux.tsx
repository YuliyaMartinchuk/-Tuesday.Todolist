import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {Grid, Paper} from "@mui/material";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from '@mui/material/Container'
import {addTaskAC, changeStatusAC, removeTaskAC,  updateTaskAC} from "./state/tasksReducer";
import {
    addTodoliststAC,
    changeFilterAC,
    removeTodolistAC,
    updateTodolistTitleAC
} from "./state/todolistsReducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {todoliststsSelector} from "./state/selectors";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type AssocTaskType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    // let todolists = useSelector<AppRootStateType, TodolistType[]>(state=>state.todolists)
    let todolists = useSelector(todoliststsSelector)

    let tasks = useSelector<AppRootStateType, AssocTaskType>(state=>state.tasks)

    const dispatch= useDispatch()

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    },[dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeStatusAC(todolistId, taskId, isDone))

    },[dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    },[dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatch(action)
    },[dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    },[dispatch])

    const addTodolists = useCallback((newTitle: string) => {
        let action = addTodoliststAC(newTitle)
        dispatch(action)
    }, [dispatch])

    const updateTask = useCallback((todolistId: string, taskId: string, updateTitle: string) => {
        dispatch(updateTaskAC(todolistId, taskId, updateTitle))
    },[dispatch])

    const updateTodolistTitle = useCallback((todolistId: string, updateTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistId, updateTitle))
    },[dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm callBack={addTodolists}/>
                </Grid>

                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper elevation={5} style={{padding: "10px"}}>
                                    <Todolist

                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
