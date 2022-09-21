import React, { useContext } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { signIn } from "../api/session.js"
import Color from './common/Color';
import { AuthContext } from '../../App.jsx';

export const SignIn = () => {
    const { register, handleSubmit } = useForm();
    const { setCurrentUser, setIsSignedIn} = useContext(AuthContext)

    const handleSignIn = async(data) => {
        try {
            const res = await signIn(data)
            console.log(res)
      
            if (res.status === 200) {
              Cookies.set("_access_token", res.headers["access-token"])
              Cookies.set("_client", res.headers["client"])
              Cookies.set("_uid", res.headers["uid"]) 
              setIsSignedIn(true);
              setCurrentUser(res.data.data)
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    }

    return (
        <Div>
            <h1>サインイン</h1>
            <FormDiv>
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <p><label>メールアドレス</label></p>
                    <input {...register("email")} />
                    <p><label>パスワード</label></p>
                    <input {...register("password")} />
                    <p><button type="submit" >サインイン</button></p>
                </form>
                <p id="signUpGuide">アカウントをお持ちでない方は:<Link to="signup">アカウントを作成する</Link></p>
            </FormDiv>
        </Div>
    )
}

const Div = styled.div`
    margin:0 auto; 

    h1 {
        margin:0 auto;
        text-align: center;
    }

`

const FormDiv = styled.div`
    padding-top: 70px;
    @media (max-width: 425px) {
        max-width:100%;
    }
    max-width: 40%;
    margin: 0 auto;

    #signUpGuide {
        text-align: right;
    }

    form {
        p {
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            box-sizing: border-box;
            border: solid 1px gray;
            padding: 10px;
        }
        button {
            display: block;
            background-color: ${Color.primary};
            color: white;
            border: none;
            padding: 15px;
            cursor: pointer;
            margin: 0 auto;
            width: 100%;
        }
    }
`