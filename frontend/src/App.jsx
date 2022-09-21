import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LayOut } from './lib/components/LayOut';
import { SignUp } from './lib/components/SignUp';
import { getCurrentUser } from "./lib/api/session.js"

export const AuthContext = React.createContext("");

export const App = () => {
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  const LoggedInRoute = ( {children} ) => {
    if (!loading) {
      if (isSignedIn) {
        return children ;
      } else {
        return <Navigate  to='/' />;
      }
    } else {
      return <></>;
    }
  };
  
  const NotLoggedInRoute = ( {children} ) => {
    if (!loading) {
      if (!isSignedIn) {
        return children ;
      } else {
        return <Navigate to="/books" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <AuthContext.Provider value={{currentUser,setCurrentUser,setIsSignedIn, isSignedIn}}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LayOut/>}>
          <Route path={"/signup"} element={<SignUp/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};