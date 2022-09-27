import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Color from './Color';
import { createNews } from '../../api/news';
import { FlashMessage } from './FlashMessage';
import { AuthContext } from '../../../App.jsx';

export const NewsForm = () => {
    const [ message,setMessage ] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext)
    const [ type, setType ] = useState("warning");

    const handleCreateNews = async(data) => {
        setMessage([]);
        const params = { title: watch("title"), content: watch("content"), userId: currentUser.user.id}
        try {
            const res = await createNews(params) 
            if (res.status === 200) {
                navigate("/news", {state: { message: "Newsを投稿しました。"}})
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
        <FormDiv>
            <FlashMessage message={message} type={type} />
            <h1>Newsを投稿する</h1>
            <form onSubmit={handleSubmit(handleCreateNews)}>
            <p><label>タイトル</label></p>
            <input className="titleForm" {...register("title",{ required: true, maxLength: 30 })} />
            {errors.title?.type === "required" && <ErrorMessage>タイトルを入力して下さい。</ErrorMessage>}
            {errors.title?.type === "maxLength" && <ErrorMessage>30文字以内で入力して下さい。</ErrorMessage>}
            <p><label>本文</label></p>
            <textarea className="contentForm" {...register("content",{ required: true })} />
            {errors.content?.type === "required" && <ErrorMessage>本文を入力して下さい。</ErrorMessage>}
            <p><button type="submit" >投稿</button></p>
            </form>
        </FormDiv>
        );
}

const FormDiv = styled.div`
    width: 50%;
    margin: 0 auto;
    input {
        box-sizing: border-box;
        border: solid 1px gray;
        padding: 10px;
    }
    p {
        margin: 3px;
    }
    h1 {
        text-align: center;
        font-weight: lighter;
        font-size: 1.1rem;
    }
    .titleForm {
        width: 100%;
    }
    .contentForm {
        width: 100%;
        height: 40vh;
        margin-bottom: 10px;
    }
    button {
        display: block;
        background-color: ${Color.primary};
        color: white;
        border: none;
        margin: 0 auto;
        width: 100%;
        padding: 10px;
        cursor: pointer;
    }
`
const ErrorMessage = styled.span`
  font-size: 0.8rem;
  display: block;
  background-color: ${Color.form};
`