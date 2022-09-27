import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LayOut } from './lib/components/LayOut';
import { SignUp } from './lib/components/SignUp';
import { SignIn } from './lib/components/SignIn';
import { MyPage } from './lib/components/MyPage';
import { MyPageInfo } from './lib/components/MyPageInfo';
import { News } from './lib/components/News';
import { CreateNews } from './lib/components/CreateNews';
import { Calendar } from './lib/components/Calendar';
import { getCurrentUser } from "./lib/api/session.js"
import { fetchSections } from "./lib/api/section.js"

export const AuthContext = React.createContext("");

export const App = () => {
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [sections, setSections] = useState({});

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const res = await fetchSections();
      setSections(res.data.sections)
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
        return <Navigate to="/news" />;
      }
    } else {
      return <></>;
    }
  };

  const AdminProtectedRoute = ( {children} ) => {
    if (!loading) {
      if (isSignedIn && currentUser.user.admin === true) {
        return children ;
      } else {
        return <Navigate to="/news" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <AuthContext.Provider value={{currentUser,setCurrentUser,setIsSignedIn, isSignedIn, sections}}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<LayOut/>}>
              <Route path={"/"} element={<NotLoggedInRoute><SignIn/></NotLoggedInRoute>}/>
              <Route path={"/signup"} element={<NotLoggedInRoute><SignUp/></NotLoggedInRoute>}/>
              <Route path={"/calendar"} element={<LoggedInRoute><Calendar/></LoggedInRoute>}/>
              <Route path={"/mypage"} element={<LoggedInRoute><MyPage/></LoggedInRoute>}>
               <Route path={"info"} element={<MyPageInfo/>} />
              </Route>
              <Route path={"/news"} element={<LoggedInRoute><News/></LoggedInRoute>} />
              <Route path={"/news/create"} element={<AdminProtectedRoute><CreateNews/></AdminProtectedRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </AuthContext.Provider>
  );
};