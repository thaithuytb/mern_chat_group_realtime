import React, { useState } from "react";

export const displayContext = React.createContext();

const DisplayContextProvider = ({children}) => {
    const [ theme, setTheme ] = useState({
        isDark: true,
        dark: {
            header: {
                background: "#242526",
                color: "#b0b3b8",
                borderBottom: "1px solid #393a3b",
            },
            sidebar: {
                background: "#242526",
                color: "#b0b3b8",
                borderRight: "2px solid #393a3b", 
            },
            component : {
                background: '#18191a',
                color: '#e4ddbf',
            }
        },
        light: {
            header: {
                background: "black",
                color: "white",
            },
            sidebar: {
                background: "white",
                color: "black",
            },
            component : {
                background: 'white',
                color: 'black',
            }
        }
    })
    const [ isShowChangeInfo, setIsShowChangeInfo ] = useState(false);

    const data = {isShowChangeInfo, setIsShowChangeInfo, theme, setTheme };
    return (
        <displayContext.Provider value={data}>
            {children}
        </displayContext.Provider>
    )
}

export default DisplayContextProvider;
