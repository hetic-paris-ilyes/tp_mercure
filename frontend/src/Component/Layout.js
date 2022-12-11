import UserList from "./UserList";
import NeedAuth from "../Auth/NeedAuth";

export default function Layout(props) {
return(
    <div>
        <NeedAuth>
            <div>
                <UserList/>
            </div>
            <div>
                {props.children}
            </div>
        </NeedAuth>
    </div>
)
}