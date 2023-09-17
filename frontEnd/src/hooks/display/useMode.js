import { useMemo, useState, createContext, useContext } from 'react';


const ModeContext = createContext({});

const useMode = () => {
    return useContext(ModeContext);
}

export default useMode;
export {ModeContext};