import React, { useState } from "react";

export const displayContext = React.createContext();

const DisplayContextProvider = ({children}) => {
  const [ isShowChangeInfo, setIsShowChangeInfo ] = useState(false);

    const data = {isShowChangeInfo, setIsShowChangeInfo };
    return (
        <displayContext.Provider value={data}>
            {children}
        </displayContext.Provider>
    )
}

export default DisplayContextProvider;
