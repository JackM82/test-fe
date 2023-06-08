import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

const useSession = () => {
    const session = JSON.parse(localStorage.getItem('loggedIn'))
    const navigate = useNavigate()
    //console.log(session)
    
    if (session){
        const decodedSession = jwt_decode(session.token)
        //console.log(decodedSession)
    }


    useEffect(()=>{
        if(!session){
            navigate('/',{replace: true})
        }
    },[session])
    
    return session
}

export default useSession;