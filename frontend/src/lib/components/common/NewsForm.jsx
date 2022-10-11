import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Color from './Color';
import { CreateNews } from '../../api/news';
import { UpdateNews } from '../../api/news';
import { AuthContext } from '../../../App.jsx';
import { SectionSelector } from './SectionSelector';
import { UserSelector  } from './UserSelector';

export const NewsForm = (props) => {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const { initialContent, initialTitle, initialTo, initialFrom, initialToUsers, initialFromUsers, newsId, update } = props;
    const navigate = useNavigate();
    const { currentUser, sections, setMessage } = useContext(AuthContext)
    const [selectedSectionFrom, setSelectedSectionFrom] = useState([]);
    const [selectedAreaFrom, setSelectedAreaFrom] = useState([]);
    const [selectedSectionTo, setSelectedSectionTo] = useState([]);
    const [selectedAreaTo, setSelectedAreaTo] = useState([]);
    const [ toUsers, setToUsers ] = useState([]);
    const [ fromUsers, setFromUsers ] = useState([]);

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
        initialToUsers && setToUsers(initialToUsers);
        initialFromUsers && setFromUsers(initialFromUsers);
    },[setValue, initialToUsers, initialFromUsers]);
    useEffect(()=>{setInitialValue(initialContent,initialTitle,initialTo, initialFrom)},[setInitialValue,initialContent,initialTitle,initialTo, initialFrom]);

    const handleSubmitNews = async(data) => {
        const params = { title: watch("title"), content: watch("content"), userId: currentUser.user.id, selectedAreaFrom: selectedAreaFrom, selectedAreaTo: selectedAreaTo, selectedUserFrom: fromUsers, selectedUserTo: toUsers}
        try {
            if ( update === true ) {
                const res = await UpdateNews(newsId,params) 
                if (res.status === 200) {
                    navigate(`/news/${newsId}`, {state: {message: "Newsを更新しました。"}})
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

    const deleteUsers = (state,setState, targetId) => {
        setState(
            state.filter((s) => (s.id !== targetId))
        )
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
            <ToFrom>
               <p><ToFromLabel>From: Newsの発信源</ToFromLabel></p>
                <SelfButton type="button" onClick={()=>{setFromUsers([{id: currentUser.user.id, name: currentUser.user.name, email: currentUser.user.email}])}}>自分(個人)を選択</SelfButton>
                <Selected>
                { fromUsers && fromUsers.length > 0 &&
                    fromUsers.filter((element, index) => fromUsers.indexOf(element) === index).map((user, index)=>{
                        return <span onClick={()=>{deleteUsers(fromUsers,setFromUsers,user.id)}} key={index}>{user.name}&lt;{user.email}&gt;</span>
                    })
                }
                </Selected>
                <SectionSelector
                    sections={currentUser.sections}
                    selectedSection={selectedSectionFrom}
                    setSelectedSection={setSelectedSectionFrom}
                    selectedArea={selectedAreaFrom}
                    setSelectedArea={setSelectedAreaFrom}/>
            </ToFrom>
            <ToFrom>
                <p><ToFromLabel>To: Newsの配信先</ToFromLabel></p>
                <UserSelector selectedUsers={toUsers} setSelectedUsers={setToUsers}/>
                <Selected>
                { toUsers.length > 0 &&
                    toUsers.filter((element, index) => toUsers.indexOf(element) === index).map((user, index)=>{
                        return <span onClick={()=>{deleteUsers(toUsers,setToUsers,user.id)}} key={index}>{user.name}&lt;{user.email}&gt;</span>
                    })
                }
                </Selected>
                <SectionSelector
                    sections={sections}
                    selectedSection={selectedSectionTo}
                    setSelectedSection={setSelectedSectionTo}
                    selectedArea={selectedAreaTo}
                    setSelectedArea={setSelectedAreaTo}/>
                </ToFrom>
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
        display: inline;
        margin-right: 10px;
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
    }
    button[type="submit"] {
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

const Selected = styled.div`
    span {
        border: solid 1px ${Color.primary};
        padding: 5px;
        margin: 0px 5px;
        color: #fff;
        cursor: pointer;
        background: ${Color.primary};
    }
`

const SelfButton = styled.button`
    display: inline;
    margin-bottom: 10px;
    cursor: pointer;
    border: solid 1px black;
    :hover {
        background: ${Color.primary};
        color: #fff;
        border: solid 1px ${Color.primary};
    }
`

const ToFromLabel = styled.label`
    margin: 5px 0px;
    border-bottom: solid 1px;
`

const ToFrom = styled.div`
    border: solid 2px ${Color.primary};
    padding: 5px;
    margin: 8px 0px;
    border-radius: 10px;
`