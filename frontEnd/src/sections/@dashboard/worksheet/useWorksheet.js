import {useState, createContext, useContext, useEffect} from "react";
import useAxiosJWT from "../../../hooks/useAxiosJWT";
import {useAuth} from "../../../hooks/useAuth";

const WorksheetContext = createContext();


const WorksheetProvider = ({children}) => {
  const[checklist, setChecklist] = useState([]);
  const[batch, setBatch] = useState([]);
  const axiosJWT = useAxiosJWT();
  const {auth, setAuth} = useAuth();

  const userId = auth?.id;

  const getChecklist = async() => {
    try{
        const response = await axiosJWT.get("/getChecklistByUser/0");
        setChecklist(response.data);
        console.log(response.data);
    }catch(err){
        console.log(err);
    }
};

  const getBatch = async() => {
      try{
          const response = await axiosJWT.get(`/getBatchByUser/${userId}/0`)
          setBatch(response.data);
          console.log(response.data);
      }catch(err){
          console.log(err);
      }
  };

  const editChecklist = async() => {


  };

  const editBatch = async() => {


  };

  useEffect(() => {
    getChecklist();
    getBatch();
  }, [])


    return (
        <WorksheetContext.Provider value={{checklist, batch, getChecklist, getBatch, editChecklist, editBatch}}>
            {children}
        </WorksheetContext.Provider>
    )
}

const useWorksheet = () => {
    return useContext(WorksheetContext);
}

export default useWorksheet;
export {WorksheetProvider};