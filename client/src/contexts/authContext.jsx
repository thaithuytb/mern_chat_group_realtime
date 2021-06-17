import React, { createContext, useState, useEffect } from 'react';
import authApi from './../api/authApi';
import { LOCAL_STORAGE_TOKEN } from '../config/constants';
//import utils
import { setHeadersToken } from '../utils/setHeadersToken';
export const authContext = createContext();

const AuthContextProvider = ({children}) => {
    //login
    const [ authState , setAuthState] = useState({
        isLoading: true,
        isAuthenticated: false,
        user: null
    })
    // run when start in app, if we had have token => automatic redirect DASHBOARD
    // if mock token or dont have token => automatic redurect LOGIN
    useEffect(() => {
        const checkAndVerifyToken = async () => {
            if(localStorage[LOCAL_STORAGE_TOKEN]) {
                const { verifyTokenAuth } = authApi;
                const token = localStorage[LOCAL_STORAGE_TOKEN];
                //attach headers token
                setHeadersToken(token);
                try {
                    const response = await verifyTokenAuth();
                    if (response.data.success) {
                        const { user } = response.data;
                        setAuthState({...authState, isLoading: false, isAuthenticated: true, user });
                    }
                } catch (error) {
                    console.log(error.message);
                    setHeadersToken(null);     
                }
            } else {
                setAuthState({...authState, isLoading: false });
            }
        };
        checkAndVerifyToken();
    }, [])
    const userLoginForm = async (userForm) => {
        const { loginAuth } = authApi;
        try {
            const response = await loginAuth(userForm);
            if (response.data.success) {
                const { accessToken, user } = response.data;
                localStorage.setItem(LOCAL_STORAGE_TOKEN, accessToken);
                setAuthState({...authState, isLoading: false ,isAuthenticated: true, user});
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