import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayOut } from './lib/components/LayOut';
import { SignUp } from './lib/components/SignUp';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LayOut/>}>
         <Route path={"/signup"} element={<SignUp/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};