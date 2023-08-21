import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route, Navigate} from 'react-router-dom'
import {Login} from "./components/Login";


const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            {/*<AppWithRedux/>*/}
            <Routes>
                <Route path={"/"} element={<AppWithRedux/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path="*" element={<Navigate to={'/404'}/>}/>
            </Routes>
        </Provider>
    </BrowserRouter>

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

