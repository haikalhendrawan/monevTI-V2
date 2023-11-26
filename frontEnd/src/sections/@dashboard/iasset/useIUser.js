import {useState, createContext, useContext, useEffect} from "react";
import useAxiosJWT from "../../../hooks/useAxiosJWT";

const IUserContext = createContext();


const IUserProvider = ({children}) => {
    const [IUSER, setIUSER] = useState([]);

    const axiosJWT = useAxiosJWT();

    const getIUser = async () => {
        try{
          const response = await axiosJWT.get("/getIUser");
          setIUSER(response.data);
          console.log(response.data);
        }catch(err){
          console.log(err);
        }
      };

    useEffect(() => {
      getIUser();
    },[]);

    return (
        <IUserContext.Provider value={{IUSER, setIUSER, getIUser}}>
            {children}
        </IUserContext.Provider>
    )
}

const useIUser = () => {
    return useContext(IUserContext);
}

export default useIUser;
export {IUserProvider};