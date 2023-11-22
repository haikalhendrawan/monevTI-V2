import {useState, createContext, useContext, useEffect} from "react";
import useAxiosJWT from "../../../hooks/useAxiosJWT";

const AssetContext = createContext();


const AssetProvider = ({children}) => {
    const [ASSET, setASSET] = useState([]);

    const axiosJWT = useAxiosJWT();

    const getIAsset = async () => {
        try{
          const response = await axiosJWT.get("/getIAsset");
          setASSET(response.data);
          console.log(response.data);
        }catch(err){
          console.log(err);
        }
      };

      useEffect(() => {
        getIAsset();
      },[]);

    return (
        <AssetContext.Provider value={{ASSET, setASSET, getIAsset}}>
            {children}
        </AssetContext.Provider>
    )
}

const useAsset = () => {
    return useContext(AssetContext);
}

export default useAsset;
export {AssetProvider};