import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/login.js";
import Register from "./components/Register/register.js";
import Content from "./components/content/content.jsx";

function App()
{
    return (
    <div>
        <BrowserRouter>
            <Routes>
            <Route path="/home"  element= { <Content />}   />
            <Route path="/" element= {<Login />} />
            <Route path="/signup" element= {<Register />} /> 
            </Routes>
        </BrowserRouter>
    </div>
    )
}
export default App;