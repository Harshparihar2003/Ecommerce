import {Navigate} from "react-router-dom"

export const PrivateRoutes = ({children}) =>{
    // const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("token"))
    const getTokenFromLocalStorage = localStorage.getItem("token")
    return getTokenFromLocalStorage?.token !== undefined ? children : (<Navigate to="/login" replace={true}/>)
}