import {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import useBackendChat from "../Hook/useBackendChat";
import {useContext} from "react";
import {userContext} from "../Context/UserContext";
import { Link } from "react-router-dom";

export default function UserList() {
    const parseJwt = (token) => {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const [userList, setUserList] = useState([]);

    const {user} = useContext(userContext);
    const getUserList = useGetUserList();
    const backendChat = useBackendChat();
    const myUser = parseJwt(user);
    const loggedUserID = user ? myUser.mercure.payload.userid : null;
    console.log(loggedUserID);

    //TODO handlesubmit to get chatid et ensuite une redirection vers chat/:chatid

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;
        backendChat(userId).then(data => console.log(data))
    }
    console.log(user);

    const handleMessage = (e) => {
        document.querySelector('h1').insertAdjacentHTML('afterend', '<div class="alert alert-success w-75 mx-auto">Ping !</div>');
        window.setTimeout(() => {
            const $alert = document.querySelector('.alert');
            $alert.parentNode.removeChild($alert);
        }, 2000);
        console.log(JSON.parse(e.data));
    }
    useEffect(() => {
        getUserList().then(data => setUserList(data.users));

        /*const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://example.com/my-private-topic');

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
        }*/

    }, [])

    return (
        <div>
            <h1 className='m-5 text-center'>Ping a user</h1>

            {userList.map((userItem) => (
                <form key={userItem.id} className='w-75 mx-auto mb-3'>
                    <button className='btn btn-dark w-100' type='submit' value={userItem.id}>{userItem.username}</button>
                </form>
            ))}
        </div>
    )
}