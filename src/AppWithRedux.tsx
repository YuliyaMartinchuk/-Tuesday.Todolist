import React, {useCallback, useEffect} from 'react';
import './App.css';
import { Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {Grid, Paper} from "@mui/material";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from '@mui/material/Container'
import { changeTaskStatusTC, createTaskTC, deleteTaskTC, updateTaskAC} from "./state/tasksReducer";
import {
    changeFilterAC, changeTodolistTC, createTodolistTC, deleteTodolistTC, FilterValuesType, getTodoliststTC,

} from "./state/todolistsReducer";

import { useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./state/store";
import {todoliststsSelector} from "./state/selectors";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "./state/appReducer";
import {ErrorSnackbar} from "./components/ErrorSnackbar";

// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }

export type AssocTaskType = {
    [key: string]: TaskDomainType[]
}

export type TaskDomainType = TaskType & {
   entityStatus: RequestStatusType
}


function AppWithRedux() {

    let todolists = useSelector(todoliststsSelector)
    let tasks = useSelector<AppRootStateType, AssocTaskType>(state=>state.tasks)
   const status = useAppSelector<RequestStatusType>(state => state.app.status)

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getTodoliststTC())
    },[])

       const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    },[dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(todolistId, taskId, status))

    },[dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    },[dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    },[dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskTC(todolistId,title))
    },[dispatch])

    const addTodolists = useCallback((newTitle: string) => {
        dispatch(createTodolistTC(newTitle))
    }, [dispatch])

    const updateTask = useCallback((todolistId: string, taskId: string, updateTitle: string) => {
        dispatch(updateTaskAC(todolistId, taskId, updateTitle))
    },[dispatch])

    const updateTodolistTitle = useCallback((todolistId: string, updateTitle: string) => {
        dispatch(changeTodolistTC(todolistId, updateTitle))
    },[dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color="secondary" />}
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
                                        filter={tl.filter}
                                        entityStatus = {tl.entityStatus}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
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
            <ErrorSnackbar/>
        </div>
    );
}

export default AppWithRedux;
