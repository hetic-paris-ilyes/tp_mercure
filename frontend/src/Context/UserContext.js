import {useState, createContext} from "react";

export const userContext = createContext('');

export default function UserProvider(props) {
    const [user, setUser] = useState('');
    const value = {
        user,
        setUser
    }

    return (
        <userContext.Provider value={ value }>
            {props.children}
        </userContext.Provider>
    )
}