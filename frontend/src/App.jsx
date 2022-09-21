import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayOut } from './lib/components/LayOut';
import { SignUp } from './lib/components/SignUp';
import { getCurrentUser } from "./lib/api/session.js"

export const AuthContext = React.createContext("");

export const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      console.log(res)
      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  return (
    <AuthContext.Provider value={setIsSignedIn}>
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