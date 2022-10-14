import React, { useState, useEffect, useCallback, useContext } from 'react';
import Color from '../common/Color.jsx';
import styled from "styled-components";
import { SectionSelector } from '../common/SectionSelector.jsx';
import { AuthContext  } from '../../../App.jsx';
import moment from 'moment'
import { UpdateEvent } from '../../api/event.js';

export const EventForm = (props) => {
    const { currentUser, sections} = useContext(AuthContext);
    const [selectedSection, setSelectedSection] = useState([]);
    const [selectedArea, setSelectedArea] = useState([]);
    const [errors, setErrors] = useState([])
    const hourArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    const [params, setParams] = useState({
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        allDay: false,
        description: ""
    })
    const { eventId, event, initialSections, action, setIsEdit, loadEvent, loadEvents } = props;
    const setInitialValue = useCallback(()=>{
        setParams({title: event.title,
            startDate: (moment(event.start).format("YYYY-MM-DD")),
            startTime: (moment(event.start).format("HH:mm")),
            endDate: (moment(event.end).format("YYYY-MM-DD")),
            endTime: (moment(event.end).format("HH:mm")),
            allDay: event.allDay,
            description: event.description
        })
        if (initialSections) {
            const toPushSec = []
            const toPushArea = []
            initialSections.forEach((array)=>{
                toPushSec.push(array[0].sections.toLowerCase())
                array.forEach((n)=>{
                    toPushArea.push( `${n.sections.toLowerCase()},${n.areas}`)
                })
            })
            setSelectedSection(toPushSec);
            setSelectedArea(toPushArea);
        }
    },[]);

    useEffect(()=>{setInitialValue()},[setInitialValue]);

    const handleCheck = (e) => {
        if (e.target.checked) {
            setParams({...params, allDay : true,  startTime: "", endTime: ""})
        } else if (!e.target.checked) {
            setParams({...params, allDay : false});
        }
    }

    const handleSubmit = async(e) => {
        e.stopPropagation()
        if (selectedArea.length === 0) {
            return;
        }
        if (action === "update") {
            try {
                const res = await UpdateEvent({userId: currentUser.user.id, event: params, sections: selectedArea}, eventId) 
                if ( res.data.status === "success") {
                    loadEvent();
                    loadEvents();
                    setIsEdit(false);
                } else {
                    setErrors(res.data.errors)
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    const handleChange=(value,type) => {
        if (type === "title"){
            setParams({...params, title: value})
          } else if (type === "startDate") {
            setParams({...params, startDate: value})
          } else if (type === "startTime") {
            setParams({...params, startTime: value})
          } else if (type === "endDate") {
            setParams({...params, endDate: value})
          } else if (type === "endTime") {
            setParams({...params, endTime: value})
          } else if (type === "description") {
            setParams({...params, description : value})
          }
    }


    return (
        <>
        <Inputs>
            <h2>イベント作成</h2>
            { [...new Set(errors)].map((error)=> {
                return <ErrorMessage>{error}</ErrorMessage>
            })}
            <label>タイトル</label>
            <input value={params.title} onChange={(e)=>handleChange(e.target.value,"title")} className="title" />
            <label>開始</label>
            <p>
                <input min="2022-09-20" max="2025-09-19" onChange={(e)=>handleChange(e.target.value,"startDate")} value={params.startDate} className="date" type="date" />
                <select onChange={(e)=>handleChange(e.target.value,"startTime")} className="time" value={params.startTime} type="time" disabled={params.allDay} >
                    {hourArray.map((arr) => {
                        return <option key={arr} value={("0" + arr).slice(-2) + ":00"}>{("0" + arr).slice(-2)}:00</option>
                    })}
                </select>
            </p>
            <label>終了</label>
            <p>
                <input min="2022-09-20" max="2025-09-19" onChange={(e)=>handleChange(e.target.value,"endDate")}  value={params.endDate} className="date" type="date" />
                <select onChange={(e)=>handleChange(e.target.value,"endTime")} className="time" value={params.endTime} type="time" disabled={params.allDay} >
                    {hourArray.map((arr) => {
                        return <option key={arr} value={("0" + arr).slice(-2) + ":00"}>{("0" + arr).slice(-2)}:00</option>
                    })}
                </select>
            </p>
            <input type="checkBox" name="allDay" checked={params.allDay} value="true" onChange={(e)=>handleCheck(e)} /><span>終日</span>
            <label>説明</label>
            <textarea value={params.description} onChange={(e)=>handleChange(e.target.value,"description")} className="description" />
        </Inputs>
        <SectionDiv>
            <p>所属セクション・エリア</p>
            <SectionSelector
                sections={sections}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                selectedArea={selectedArea}
                setSelectedArea={setSelectedArea}
                showLabel={false}/>
        </SectionDiv>
        <Submit className="submit" type="button" onClick={(e)=>handleSubmit(e)}>{action === "update" ? "更新" : "作成"}</Submit>
    </>
    )
}
const Inputs = styled.div`
    h2 {
        text-align: center;
    }
    label {
        display: block;
        margin-left: 5%;
        margin-top: 20px;
    }
    input {
        margin-left: 5%;
        background: none;
        box-sizing: border-box;
        border: none;
        border-bottom: solid 1px gray;
        padding: 8px;
    }

    select {
    margin-left: 5%;
    background: none;
    box-sizing: border-box;
    border: none;
    border-bottom: solid 1px gray;
    padding: 8px;
    }
    textarea {
        margin-left: 5%;
        background: none;
        box-sizing: border-box;
        border: none;
        border-bottom: solid 1px gray;
        padding: 8px;
    }
    input[type="checkBox"] {
        width: 20px;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .title,.description {
        width: 85%;
    }
    .description {
    min-height: 100px;
    }
    .date, .time {
        width: 40%;
    }
`

const Submit = styled.button`
    display: block;
    background-color: ${Color.primary};
    color: white;
    border: none;
    margin: 0 auto;
    width: 50%;
    padding: 15px;
    cursor: pointer;
`

const SectionDiv = styled.div`
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20px;
`

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  display: block;
  background-color: ${Color.form};
`