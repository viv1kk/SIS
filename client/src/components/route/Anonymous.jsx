import { Navigate, Outlet } from "react-router-dom";

const Anonymous = () => {
    // logic that determines whether the user is logged in or not
    const item = JSON.parse(localStorage.getItem('user'));
    const token = item?.accessToken;
  
    return token ? <Navigate to="/" replace /> : <Outlet />
}

export default Anonymous;