import {Navigate, useLocation} from "react-router-dom";
import {userContext} from "../Context/UserContext";
import {useContext, useEffect, useState} from "react";
import Cookies from 'universal-cookie';

export default function NeedAuth(props) {
    let location = useLocation();
    const {user, setUser} = useContext(userContext);
    const cookies = new Cookies();
    const myUserCookie = cookies.get("MyUser");

    useEffect(()=>{
        if (myUserCookie && !user) {
            setUser(myUserCookie);
        }
    },[myUserCookie,user,setUser]);

    if (myUserCookie) {
        return props.children;
    } else {
        return <Navigate to='/login' state={{from: location}}/>
    }
}