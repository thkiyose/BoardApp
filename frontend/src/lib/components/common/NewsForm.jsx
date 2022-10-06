import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Color from './Color';
import { CreateNews } from '../../api/news';
import { UpdateNews } from '../../api/news';
import { AuthContext } from '../../../App.jsx';
import { SectionSelector } from './SectionSelector';

export const NewsForm = (props) => {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const { initialContent, initialTitle, initialTo, initialFrom, newsId, update } = props;
    const navigate = useNavigate();
    const { currentUser, sections } = useContext(AuthContext)
    const [selectedSectionFrom, setSelectedSectionFrom] = useState([]);
    const [selectedAreaFrom, setSelectedAreaFrom] = useState([]);
    const [selectedSectionTo, setSelectedSectionTo] = useState([]);
    const [selectedAreaTo, setSelectedAreaTo] = useState([]);
    const { message, setMessage } = useOutletContext();
   
    const setInitialValue = useCallback((initialContent,initialTitle,initialTo,initialFrom)=>{
        setValue("title",initialTitle);
        setValue("content",initialContent);
        if (initialTo && initialFrom) {
            const toSec = [...initialTo].map((x)=> {return x.section.toLowerCase()})
            const newToSec = toSec.filter((element, index) => toSec.indexOf(element) === index);
            const toAr = [...initialTo].map((x)=> {return `${x.section.toLowerCase()},${x.area}`})
            setSelectedSectionTo(newToSec)
            setSelectedAreaTo(toAr)
            const fromSec = [...initialFrom].map((x)=> {return x.section.toLowerCase()})
            const newFromSec = fromSec.filter((element, index) => fromSec.indexOf(element) === index);
            const fromAr = [...initialFrom].map((x)=> {return `${x.section.toLowerCase()},${x.area}`})
            setSelectedSectionFrom(newFromSec)
            setSelectedAreaFrom(fromAr)
        }
    },[setValue]);
    useEffect(()=>{setInitialValue(initialContent,initialTitle,initialTo, initialFrom)},[setInitialValue,initialContent,initialTitle,initialTo, initialFrom]);

    const handleSubmitNews = async(data) => {
        const params = { title: watch("title"), content: watch("content"), userId: currentUser.user.id, selectedAreaFrom: selectedAreaFrom, selectedAreaTo: selectedAreaTo}
        try {
            if ( update === true ) {
                const res = await UpdateNews(newsId,params) 
                if (res.status === 200) {
                    navigate("/news/index/all")
                    setMessage(["Newsを更新しました。"])
                } else {
                    console.log(res)
                }
                } else {
                    const res = await CreateNews(params) 
                    if (res.status === 200) {
                        navigate("/news/index/all", {state: { message: "Newsを投稿しました。"}})
                    } else {
                        console.log(res)
                    }
                }
            } catch (e) {
            console.log(e)
            if (e.response?.data?.errors?.fullMessages) {
                setMessage(e.response?.data?.errors?.fullMessages)
                } else if (e.message) {
                setMessage([e.message])
                }
            }
    }

    return (
        <FormDiv>
            <h1>{ update ? "Newsを更新する" : "Newsを投稿する" }</h1>
            <form onSubmit={handleSubmit(handleSubmitNews)}>
            <p><label>タイトル</label></p>
            <input className="titleForm" {...register("title",{ required: true, maxLength: 30 })} />
            {errors.title?.type === "required" && <ErrorMessage>タイトルを入力して下さい。</ErrorMessage>}
            {errors.title?.type === "maxLength" && <ErrorMessage>30文字以内で入力して下さい。</ErrorMessage>}
            <p><label>本文</label></p>
            <textarea className="contentForm" {...register("content",{ required: true })} />
            {errors.content?.type === "required" && <ErrorMessage>本文を入力して下さい。</ErrorMessage>}
            <p><label>From: Newsの発信源</label></p>
            <SectionSelector
                sections={currentUser.sections}
                selectedSection={selectedSectionFrom}
                setSelectedSection={setSelectedSectionFrom}
                selectedArea={selectedAreaFrom}
                setSelectedArea={setSelectedAreaFrom}/>
            <p><label>To: Newsの配信先セクション/エリア</label></p>
            <SectionSelector
                sections={sections}
                selectedSection={selectedSectionTo}
                setSelectedSection={setSelectedSectionTo}
                selectedArea={selectedAreaTo}
                setSelectedArea={setSelectedAreaTo}/>
            { update === true ? <p><button type="submit">更新</button></p> : <p><button type="submit">投稿</button></p> }
            </form>
        </FormDiv>
        );
}

const FormDiv = styled.div`
    margin: 0 auto;
    input {
        box-sizing: border-box;
        border: solid 1px gray;
        padding: 10px;
    }
    p {
        margin-top: 10px;
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