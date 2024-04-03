import { Navigate, Outlet } from "react-router-dom";
import { AnonymousPageLayout, AuthenticatedPageLayout, IndependentPageLayout} from '../layouts/PageLayout'
import { useSelector } from "react-redux";

export const AnonymousRoute = () => {
    const {currentUser} = useSelector(state=>state.user)

    return  currentUser ? <Navigate to="/" replace /> : <AnonymousPageLayout><Outlet /></AnonymousPageLayout>
}

export const AuthenticatedRoute = () => {
    const {currentUser} = useSelector(state=>state.user)

    return currentUser ? <AuthenticatedPageLayout><Outlet/></AuthenticatedPageLayout> : <Navigate to="/sign-in" replace />
}

export const IndependentRoute = () => {
    return <IndependentPageLayout><Outlet/></IndependentPageLayout>
}