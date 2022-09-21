import React, { useContext } from 'react';
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../App"
import { signOut } from "../api/session"

export const SignOutButton = () => {
    const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async() => {
        try {
            const res = await signOut();
            if (res.data.success === true) {
              Cookies.remove("_access_token");
              Cookies.remove("_client");
              Cookies.remove("_uid");
              setIsSignedIn(false);
              navigate("/");
              console.log("Succeeded in sign out")
            } else {
              console.log("Failed in sign out")
            }
          } catch (e) {
            console.log(e)
          }
    }
    if ( isSignedIn === true ) {
        return (
            <button onClick={()=>{handleSignOut()}}>ログアウト</button>
        )
    }
}