import React, {useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container'
import LinearProgress from "@mui/material/LinearProgress";
import {Navigate, Route, Routes} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {useAppDispatch, useAppSelector} from "./state/store";
import {RequestStatusType} from "./state/appReducer";
import {meTC} from "./state/authReducer";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import ButtonAppBar from "./components/ButtonAppBar";
import {Login} from "./components/Login";
import {TodolistsList} from "./components/TodolistsList";


function App() {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(meTC())
    }, [])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
