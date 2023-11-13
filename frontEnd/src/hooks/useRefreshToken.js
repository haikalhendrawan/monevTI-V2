import axios from "axios";
import {useAuth} from "./useAuth";


const useRefreshToken = () => {
    const {auth, setAuth} = useAuth(); // { username: xxx, role:xxx, accessToken, kppn:xx, msg:xxx}
    const refresh = async() => {
        const response = await axios.get("/refresh", {  
            withCredentials:true
        });
        const {id, username, name, email, image, role, kppn, accessToken, msg} = response.data;
        setAuth({...auth, id, username, name, email, image, role, kppn, accessToken, msg});
        return accessToken;
    }

    return refresh;
}

export default useRefreshToken;