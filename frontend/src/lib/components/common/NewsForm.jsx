import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Color from './Color';
import { CreateNews } from '../../api/news';
import { UpdateNews } from '../../api/news';
import { AuthContext } from '../../../App.jsx';
import { NotificationContext } from '../LayOut';
import { SectionSelector } from './SectionSelector';
import { UserSelector  } from './UserSelector';
import { FetchNotifications } from '../../api/notification';

export const NewsForm = (props) => {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const { initialContent, initialTitle, initialTo, initialFrom, initialToUsers, initialFromUsers, newsId, update } = props;
    const navigate = useNavigate();
    const { currentUser, sections } = useContext(AuthContext)
    const { setNotifications } = useContext(NotificationContext);
    const [selectedSectionFrom, setSelectedSectionFrom] = useState([]);
    const [selectedAreaFrom, setSelectedAreaFrom] = useState([]);
    const [selectedSectionTo, setSelectedSectionTo] = useState([]);
    const [selectedAreaTo, setSelectedAreaTo] = useState([]);
    const [ toUsers, setToUsers ] = useState([]);
    const [ fromUsers, setFromUsers ] = useState([]);
    const [ error, setError ] = useState([]);
    const [images, setImages] = useState([]);
    const inputId = Math.random().toString(32).substring(2);

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
                    navigate(`/news/${newsId}`, {state: {message: "News????????????????????????"}})
                } else {
                    console.log(res)
                    setError([res.message])
                }
                } else {
                    const res = await CreateNews(params) 
                    if (res.status === 200) {
                        const notifications = await FetchNotifications(currentUser.user.id);
                        setNotifications(notifications.data.notifications);
                        navigate("/news/index/all", {state: { message: "News????????????????????????"}})
                    } else {
                        console.log(res)
                        setError([res.message])
                    }
                }
            } catch (e) {
                if (e.response?.data?.errors) {
                    setError(e.response.data.errors)
                } else if (e.message) {
                    setError([e.message])
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
            <h1>{ update ? "News???????????????" : "News???????????????" }</h1>
            { error && 
                error.map((e,index)=>{
                    return <ErrorMessage key={index}>{e}</ErrorMessage>
                })
            }
            <form onSubmit={handleSubmit(handleSubmitNews)}>
            <p><label>????????????</label></p>
            <input className="titleForm" {...register("title",{ required: true, maxLength: 30 })} />
            {errors.title?.type === "required" && <ErrorMessage>???????????????????????????????????????</ErrorMessage>}
            {errors.title?.type === "maxLength" && <ErrorMessage>30???????????????????????????????????????</ErrorMessage>}
            <p><label>??????</label></p>
            <textarea className="contentForm" {...register("content",{ required: true })} />
            {errors.content?.type === "required" && <ErrorMessage>?????????????????????????????????</ErrorMessage>}
            <ToFrom>
               <p><ToFromLabel>From: News????????????</ToFromLabel></p>
                <SelfButton type="button" onClick={()=>{setFromUsers([{id: currentUser.user.id, name: currentUser.user.name, email: currentUser.user.email}])}}>??????(??????)?????????</SelfButton>
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
                <p><ToFromLabel>To: News????????????</ToFromLabel></p>
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
            { update === true ? <p><button className="submit" >??????</button></p> : <p><button className="submit" >??????</button></p> }
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
    .submit {
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
  text-align: center;
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
const ImagePreview = styled.div`
    display: flex;
    margin: 10px 0px;
    justify-content: space-around;
`

const Thumbnail = styled.img`
    max-height: 100px;
    max-width: 25%;
`