import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../contexts/Contextprovider";

export default function GuestLayout() {
    const {token} = useStateContext()
    if (token) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <div>
                For Guest User Only
            <Outlet />
            </div>
        </div>
    )
}