import {createBrowserRouter} from "react-router-dom";
import Signup from "./views/Signup.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Dashboard from "./views/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DeafultLayout />,
        children: [{
        path: "/dashboard",
        element: <Dashboard />
        },
    ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
                {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;