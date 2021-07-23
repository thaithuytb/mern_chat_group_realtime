import React, { useState } from "react";

export const displayContext = React.createContext();

const DisplayContextProvider = ({children}) => {
    const [showDetail, setShowDetail] = useState(0);
    const [ theme, setTheme ] = useState({
        isDark: false,
        dark: {
            header: {
                background: "#242526",
                color: "#b0b3b8",
                borderBottomHeader: "1px solid #393a3b",
                backgroundIconNav: "#3a3b3c",
                borderAllElementLi: "1px solid #999",
            },
            sidebar: {
                background: "#242526",
                color: "#dce2ec",
                borderRight: "2px solid #393a3b", 
            },
            component : {
                background: '#18191a',
                color: '#e4ddbf',
            }
        },
        light: {
            header: {
                background: "#ffffff",
                borderBottomHeader: "1px solid #b0b3b8",
                color: "black",
                backgroundIconNav: "#ffff",
                borderAllElementLi: "1px solid #999",
            },
            sidebar: {
                background: "#ffff",
                color: "#4692f5",
                borderRight: "2px solid #adabab", 
            },
            component : {
                background: 'white',
                color: 'black',
            }
        }
    })
    const [ isShowChangeInfo, setIsShowChangeInfo ] = useState(false);

    const data = {isShowChangeInfo, setIsShowChangeInfo, theme, setTheme, showDetail, setShowDetail};
    return (
        <displayContext.Provider value={data}>
            {children}
        </displayContext.Provider>
    )
}

export default DisplayContextProvider;
