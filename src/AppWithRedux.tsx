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

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeStatusAC(todolistId, taskId, isDone))

    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    }

    const removeTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    },[dispatch])

    const addTodolists = useCallback((newTitle: string) => {
        let action = addTodoliststAC(newTitle)
        dispatch(action)
    }, [dispatch])

    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        dispatch(updateTaskAC(todolistId, taskId, updateTitle))
    }

    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistId, updateTitle))
    }

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
                            let taskForTodolist = tasks[tl.id];
                            let tasksForTodolist = taskForTodolist;

                            if (tl.filter === "active") {
                                tasksForTodolist = taskForTodolist.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = taskForTodolist.filter(t => t.isDone);
                            }

                            return <Grid item key={tl.id}>
                                <Paper elevation={5} style={{padding: "10px"}}>
                                    <Todolist

                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
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
