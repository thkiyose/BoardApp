import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUp } from './lib/components/SignUp';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LayOut/>}/>
        <Route path={"/signup"} element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
};