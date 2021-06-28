import React, { useState, useEffect } from "react";
import postsApi from "./../api/postsApi";
import { LOCAL_STORAGE_TOKEN } from "../config/constants";
import { setHeadersToken } from "../utils/setHeadersToken";

export const postsContext = React.createContext();

const PostsContextProvider = ({ children }) => {
  const [dataPosts, setDataPosts] = useState({
    isloading: true,
    data: [],
  });
  // get posts
  const getAllMyPosts = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN]) {
      const token = localStorage[LOCAL_STORAGE_TOKEN];
      setHeadersToken(token);
      const { getPosts } = postsApi;
      try {
        const response = await getPosts();
        setDataPosts({
          ...dataPosts,
          isloading: false,
          data: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    getAllMyPosts();
  }, []);
  const dataContextPosts = { dataPosts };
  return (
    <postsContext.Provider value={dataContextPosts}>
      {children}
    </postsContext.Provider>
  );
};

export default PostsContextProvider;
