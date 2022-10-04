import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Color from './common/Color.jsx';
import styled from "styled-components";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/ja';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CreateEvent } from '../api/event'
import { FetchEvents } from '../api/event'
import { Modal } from './common/Modal';

const localizer = momentLocalizer(moment)

export const Schedule = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [params, setParams] = useState({
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        allDay: false,
        description: ""
    })
    const [errors, setErrors] = useState([])

    const loadEvents = async() => {
        try {
            const res = await FetchEvents()
            if (res.status === 200) {
                setEvents(res.data.events)
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    }
    useEffect(()=>{loadEvents()},[setEvents])

    const formatted = useMemo(()=>{
        const arr = []
        events.map((event)=>{
            return (arr.push({ title: event.title, start: new Date(event.start), end: new Date(event.end), allDay: event.allDay}))
       })
       return arr;
    },[events])
console.log(params)
    const handleSelectSlot = useCallback(
        async({ start, end }) => {
          setErrors([]);
          setShowModal(true);
          setParams({...params,
            startDate: `${start.getFullYear()}-${start.getMonth() + 1}-${('0' + start.getDate()).slice( -2 )}`,
            startTime: `${('0' +start.getHours()).slice(-2)}:${('0' + start.getMinutes()).slice(-2)}`,
            endDate: `${end.getFullYear()}-${end.getMonth() + 1}-${('0' + end.getDate()).slice( -2 )}`,
            endTime: `${('0' + end.getHours()).slice(-2)}:${('0' + end.getMinutes()).slice(-2)}`
          })
        },
        [params]
      )

    const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
    )

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

    const handleCheck = (e) => {
        if (e.target.checked) {
            setParams({...params, allDay : true,  startTime: "", endTime: ""})
        } else if (!e.target.checked) {
            setParams({...params, allDay : false});
        }
    }

    const handleSubmit = async(e) => {
        e.stopPropagation()
        const res = await CreateEvent(params) 
        try {
            if (res.data.status === "success") {
                setShowModal(false)
                loadEvents();
                setParams({title: "", startDate: "", startTime: "", endDate: "", endTime: "", allDay: false, description: ""})
            } else {
                setErrors(res.data.errors)
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Div id="calendar">
                <button>イベント追加</button>
                <Calendar
                localizer={localizer}
                startAccessor="start"
                events={formatted}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                endAccessor="end"
                style={{ height: 600 }}
                />
            </Div>
            <Modal onClick={(e)=>e.stopPropagation()} showFlag={showModal} setShowModal={setShowModal}>
                <h2>イベント作成</h2>
                { [...new Set(errors)].map((error)=> {
                    return <ErrorMessage>{error}</ErrorMessage>
                })}
                <label>タイトル</label>
                <input value={params.title} onChange={(e)=>handleChange(e.target.value,"title")} className="title" />
                <label>開始</label>
                <p>
                    <input onChange={(e)=>handleChange(e.target.value,"startDate")} value={params.startDate} className="date" type="date" /><input onChange={(e)=>handleChange(e.target.value,"startTime")} className="time" value={params.startTime} type="time" disabled={params.allDay} />
                </p>
                <label>終了</label>
                <p>
                    <input onChange={(e)=>handleChange(e.target.value,"endDate")}  value={params.endDate} className="date" type="date" /><input onChange={(e)=>handleChange(e.target.value,"endTime")} className="time" value={params.endTime} type="time" disabled={params.allDay} />
                </p>
                <input type="checkBox" name="allDay" checked={params.allDay} value="true" onChange={(e)=>handleCheck(e)} /><span>終日</span>
                <label>説明</label>
                <textarea value={params.description} onChange={(e)=>handleChange(e.target.value,"description")} className="description" />
                <button className="submit" type="button" onClick={(e)=>handleSubmit(e)}>作成</button>
            </Modal>
    </>
    )
}

const Div = styled.div`
    .rbc-calendar {
        background: #fff;
    }
    .rbc-toolbar {
        background: ${Color.secondary};
        margin: 0;
    }
    .rbc-row-content {
        z-index: 0;
    }
    .rbc-header {
        background: ${Color.primary};
        span {
            font-size: 1rem;
            font-weight: lighter;
            color: white;
        }
    }
    .rbc-day-bg {
        border: medium 1px black; ;
        .rbc-today {
            background: ${Color.form};
        }
    }
    .rbc-off-range-bg {
        background: #bcbcbc;
    }
    .rbc-date-cell {
        color: black;
    }

    .rbc-btn-group > button{
        font-size: 0px;
    }

    .rbc-btn-group:nth-child(1) > button:nth-child(1)::before{
        font-size: 14px;
        content: '今日';
    }  

    .rbc-btn-group:nth-child(1) > button:nth-child(2)::before{
        font-size: 14px;
        content: '←';
    }
    .rbc-btn-group:nth-child(1) > button:nth-child(3)::before{
        font-size: 14px;
        content: '→';
    }
    .rbc-btn-group:nth-child(3) > button:nth-child(1)::before{
        font-size: 14px;
        content: '月';
    }
    .rbc-btn-group:nth-child(3) > button:nth-child(2)::before{
        font-size: 14px;
        content: '週';
    }
    .rbc-btn-group:nth-child(3) > button:nth-child(3)::before{
        font-size: 14px;
        content: '日';
    }
    .rbc-btn-group:nth-child(3) > button:nth-child(4)::before{
        font-size: 14px;
        content: 'スケジュール';
    }
    .rbc-btn-group:nth-child(3) > button:nth-child(4)::before{
        font-size: 14px;
        content: 'スケジュール';
    }
}
`
const ErrorMessage = styled.span`
  font-size: 0.8rem;
  display: block;
  background-color: ${Color.form};
`