import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Service/AuthService";
import notificationService from "../../../Service/NotificationService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return unsubscribe;
    }, []);

    function logoutMe(): void {
        authService.logout();
        notificationService.success("Bye Bye");
    }

    return (
        <div className="AuthMenu">
            {!user &&
                <p>
                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </p>
            }
            {user &&
                <p>
                    <span>Hello {user.firstName + " " + user.lastName}</span>
                    <span> | </span>
                    <NavLink to="#" onClick={logoutMe}>Logout</NavLink>
                </p>}
        </div >
    );
}

export default AuthMenu;
