import axios from "axios";
import {useAuth} from "./useAuth";


const useRefreshToken = () => {
    const {auth, setAuth} = useAuth(); // { username: xxx, role:xxx, accessToken,msg:xxx}
    const refresh = async() => {
        const response = await axios.get("/refresh", {  
            withCredentials:true
        });
        const {username, role, accessToken, msg} = response.data;
        setAuth({...auth, username, role, accessToken, msg});
        return accessToken;
    }

    return refresh;
}

export default useRefreshToken;