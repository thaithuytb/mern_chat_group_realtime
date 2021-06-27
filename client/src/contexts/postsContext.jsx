import React from 'react'

export const postsContext = React.createContext();

const PostsContextProvider = ({children}) => {
    const dataPosts = {};
    return (
        <postsContext.Provider value={dataPosts}>
            {children}
        </postsContext.Provider>
    )
}

export default PostsContextProvider;
