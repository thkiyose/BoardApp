import React, { useContext } from 'react';
import styled from 'styled-components'
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { signUp } from "../api/session.js"
import Color from './common/Color';
import { AuthContext } from '../../App.jsx';

export const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const { setCurrentUser, setIsSignedIn} = useContext(AuthContext)

    const handleSignUp = async(data) => {
        try {
            const res = await signUp(data)
      
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
            <h1>アカウント登録</h1>
            <FormDiv>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <p><label>名前</label></p>
                    <input {...register("name")} />
                    <p><label>メールアドレス</label></p>
                    <input {...register("email")} />
                    <p><label>パスワード</label></p>
                    <input {...register("password")} />
                    <p><label>パスワード(確認)</label></p>
                    <input {...register("passwordConfirmation")} />
                    <p><button type="submit" >登録</button></p>
                </form>
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
    @media (max-width: 425px) {
        max-width:100%;
    }
    max-width: 50%;
    margin: 0 auto;
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
            margin: 0 auto;
            width: 100%;
            padding: 15px;
            cursor: pointer;
        }
    }
`