import React, { createContext, useState } from 'react';
import authApi from './../api/authApi';
import { LOCAL_STORAGE_TOKEN } from '../config/constants';

export const authContext = createContext();

const AuthContextProvider = ({children}) => {
    //login
    const [ authState , setAuthState] = useState({
        isAuthenticated: false,
        user: null
    })
    // useEffect(() => {
       
    // }, []])
    const userLoginForm = async (userForm) => {
        const { loginAuth } = authApi;
        try {
            const response = await loginAuth(userForm);
            if (response.data.success) {
                const { accessToken, user } = response.data;
                localStorage.setItem(LOCAL_STORAGE_TOKEN, accessToken);
                setAuthState({...authState, isAuthenticated: true, user });
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    //login
    const authData = { userLoginForm, authState };
    return (
        <authContext.Provider value={authData}>
            {children}
        </authContext.Provider>
    );
}

export default AuthContextProvider;