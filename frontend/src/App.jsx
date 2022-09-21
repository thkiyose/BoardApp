import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayOut } from './lib/components/LayOut';
import { SignUp } from './lib/components/SignUp';
import { getCurrentUser } from "./lib/api/session.js"

export const AuthContext = React.createContext("");

export const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={isSignedIn}>
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