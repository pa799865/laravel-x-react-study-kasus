import {Link, Outlet, Navigate} from "react-router-dom";
import { useStateContext } from "../contexts/Contextprovider.jsx";
import { useEffect } from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    const {user, token, notification, setUser, setToken} = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault()

        axiosClient.post('/logout').then(() => {
            setUser({})
            setToken(null)
    })
    }

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data)
        })
    }, []) 

    return (
        <div id='defaultLayout' >
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                     <Outlet />
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    )
}