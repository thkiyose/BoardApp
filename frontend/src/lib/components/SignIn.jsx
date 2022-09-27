import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { signIn } from "../api/session.js"
import { fetchUserSections } from "../api/section.js"
import Color from './common/Color';
import { FlashMessage } from './common/FlashMessage';
import { AuthContext } from '../../App.jsx';

export const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const { setCurrentUser, setIsSignedIn} = useContext(AuthContext)
    const [ message, setMessage ] = useState(location.state ?  [location.state.message] : []);
    const [ type, setType ] = useState(location.state && location.state.type ?  location.state.type : "warning");
    const navigate = useNavigate("");

    const handleSignIn = async(data) => {
        setMessage([]);
        try {
            const res = await signIn(data) 
            if (res.status === 200) {
              const sectionRes = await fetchUserSections(res.data.data.id)
              Cookies.set("_access_token", res.headers["access-token"])
              Cookies.set("_client", res.headers["client"])
              Cookies.set("_uid", res.headers["uid"]) 
              setIsSignedIn(true);
              setCurrentUser({user: res.data.data, sections: sectionRes.data.sections })
              navigate("/news", { state: { message: "ログインしました。"}})
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
            if (e.response?.data?.errors?.fullMessages) {
                setType("warning");
                setMessage(e.response?.data?.errors?.fullMessages)
              } else if (e.message) {
                setType("warning");
                setMessage([e.message])
              }
          }
    }

    return (
        <Div>
            <h1>ログイン</h1>
            <FlashMessage message={message} type={type} />
            <FormDiv>
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <p><label>メールアドレス</label></p>
                    <input {...register("email",{ required: true, pattern: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/ })} />
                    {errors.email?.type === "required" && <ErrorMessage>メールアドレスを入力して下さい。</ErrorMessage>}
                    {errors.email?.type === "pattern" && <ErrorMessage>正しい形式で入力して下さい。</ErrorMessage>}
                    <p><label>パスワード</label></p>
                    <input type="password" {...register("password",{required: true})} />
                    {errors.password?.type === "required" && <ErrorMessage>パスワードを入力して下さい。</ErrorMessage>}
                    <p><button type="submit" >ログイン</button></p>
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

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  display: block;
  background-color: ${Color.form};
`