import { Navigate, Outlet } from "react-router-dom";
import { AnonymousPageLayout, AuthenticatedPageLayout, IndependentPageLayout} from '../layouts/PageLayout'

export const AnonymousRoute = () => {
    // logic that determines whether the user is logged in or not
    // const item = JSON.parse(localStorage.getItem('user'));
    // const token = item?.accessToken;

    const login = true;
    return  login ? <Navigate to="/" replace /> : <AnonymousPageLayout><Outlet /></AnonymousPageLayout>
}

export const AuthenticatedRoute = () => {
    // logic that determines whether the user is logged in or not
    // const item = JSON.parse(localStorage.getItem('user'));
    // const token = item?.accessToken;
    const login = true;
    return login ? <AuthenticatedPageLayout><Outlet/></AuthenticatedPageLayout> : <Navigate to="/sign-in" replace />
}

export const IndependentRoute = () => {
    return <IndependentPageLayout><Outlet/></IndependentPageLayout>
}