//controlliamo se siamo loggati quando andiamo sulle rotte protette
//per questo serve un middleware

//Outlet renderizza tutti i componenti figli della route
//solo se l'utente è autorizzato
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const userAut = () => {
    const session = JSON.parse(localStorage.getItem('loggedIn'))//"loggedIn"
    
    //console.log(session)
    return session
    // if (session && session.payload.email.length > 0) {//&& session.email.length > 0
    //     return true
    // }
   // return true
}

const ProtectedRoutes = () => {
    const isAuthorized = userAut();
    //console.log(isAuthorized)
    const navigate = useNavigate();
    useEffect(()=>{
        if (!isAuthorized){
            navigate("/", {replace:true})
        }
    },[navigate])
    return <Outlet />
}


export default ProtectedRoutes

