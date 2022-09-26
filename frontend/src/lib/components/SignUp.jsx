import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { signUp } from "../api/session.js"
import { SectionSelector } from './common/SectionSelector.jsx';
import Color from './common/Color';
import { FlashMessage } from './common/FlashMessage';
import { AuthContext } from '../../App.jsx';

export const SignUp = () => {
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const location = useLocation();
    const { setCurrentUser, setIsSignedIn,sections} = useContext(AuthContext)
    const [ message, setMessage ] = useState(location.state ?  [location.state.message] : []);
    const [ type, setType ] = useState(location.state && location.state.type ?  location.state.type : "warning");
    const navigate = useNavigate("");
    const handleSignUp = async(data) => {
        setMessage([]);
        try {
            const res = await signUp(data)
      
            if (res.status === 200) {
              Cookies.set("_access_token", res.headers["access-token"])
              Cookies.set("_client", res.headers["client"])
              Cookies.set("_uid", res.headers["uid"]) 
              setIsSignedIn(true);
              setCurrentUser(res.data.data)
              navigate("/calendar", { state: { message: "アカウントを作成しました。"}})
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
            if (e.response?.data?.errors?.fullMessages) {
                setType("warning");
                setMessage(e.response?.data?.errors?.fullMessages);
              }
          }
    }

    return (
        <Div>
            <FlashMessage message={message} type={type} />
            <h1>アカウント登録</h1>
            <FormDiv>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <p><label>名前</label></p>
                    <input {...register("name",{required :true, maxLength: 30})} />
                    {errors.name?.type === "required" && <ErrorMessage>名前を入力して下さい。</ErrorMessage>}
                    {errors.name?.type === "maxLength" && <ErrorMessage>30文字以内で入力して下さい。</ErrorMessage>}
                    <p><label>メールアドレス</label></p>
                    <input {...register("email",{ required: true, pattern: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/ })} />
                    {errors.email?.type === "required" && <ErrorMessage>メールアドレスを入力して下さい。</ErrorMessage>}
                    {errors.email?.type === "pattern" && <ErrorMessage>正しい形式で入力して下さい。</ErrorMessage>}
                    <p><label>パスワード</label></p>
                    <input type="password" {...register("password",{ required: true, minLength: 6,maxLength: 128 })} />
                    {errors.password?.type === "required" && <ErrorMessage>パスワードを入力して下さい。</ErrorMessage>}
                    {errors.password?.type === "minLength" && <ErrorMessage>パスワードが短すぎます。(最小6文字)</ErrorMessage>}
                    {errors.password?.type === "maxLength" && <ErrorMessage>パスワードが長すぎます。(最大128文字)</ErrorMessage>}  
                    <p><label>パスワード(確認)</label></p>
                    <input type="password" {...register("passwordConfirmation",{ required: true })} />
                    {errors.passwordConfirmation?.type === "required" && <ErrorMessage>パスワードをもう一度入力して下さい。</ErrorMessage>}
                    <SectionSelector sections={sections} secName={"civil"} />
                    <p><button type="submit" >登録</button></p>
                </form>
                <p id="signInGuide">アカウントをお持ちの方は<Link to="/">ログイン</Link></p>
            </FormDiv>
        </Div>
    )
}

const Div = styled.div`
    margin:0 auto; 

    h1 {
        margin:0 auto;
        margin-top: 20px;
        text-align: center;
    }

`

const FormDiv = styled.div`
    @media (max-width: 425px) {
        max-width:100%;
    }
    max-width: 40%;
    padding-top: 30px;
    margin: 0 auto;

    #signInGuide {
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
            margin: 0 auto;
            width: 100%;
            padding: 15px;
            cursor: pointer;
        }
    }
`
const ErrorMessage = styled.span`
  font-size: 0.8rem;
  display: block;
  background-color: ${Color.form};
`
