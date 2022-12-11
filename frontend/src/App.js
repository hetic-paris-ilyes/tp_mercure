import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NeedAuth from "./Auth/NeedAuth";
import UserList from "./Component/UserList";

import Login from "./Auth/Login";
import UserProvider, {userContext} from "./Context/UserContext";
import ChatRoom from "./Component/ChatRoom";
import Layout from "./Component/Layout";
import {useContext, useState} from "react";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <Layout/>
                    }/>
                    <Route path='/chat/:chatID' element={
                        <Layout><ChatRoom/></Layout>
                    }/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
