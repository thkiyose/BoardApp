import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import Color from './common/Color.jsx';
import styled from "styled-components";
import { AuthContext  } from '../../App.jsx';
import { Calendar, momentLocalizer, eventPropGetter } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/ja';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CreateEvent } from '../api/event'
import { FetchEvents } from '../api/event'
import { Modal } from './common/Modal';
import { ShowEvent } from './ShowEvent'
import RBCToolbar from './common/Toolbar';

const localizer = momentLocalizer(moment)

export const Schedule = () => {
    const { currentUser } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [ targetId, setTargetId ] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [ onScreenDate, setOnScreenDate ] = useState();
    const [params, setParams] = useState({
        userId: currentUser.user.id,
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        allDay: false,
        description: ""
    })

    console.log(params)
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
            return (arr.push({ id: event.id, title: event.title, start: new Date(event.start), end: new Date(event.end), allDay: event.allDay}))
       })
       return arr;
    },[events])

    const minMaxChecker = () => {
        const minDate = document.getElementsByClassName("minDate")
        const collection = document.getElementsByClassName("rbc-btn-group");
        const target = collection[0].children[1]
        if (minDate.length > 0) {
            target.disabled = true;
        } else {
            target.disabled = false;
        }
    }
    const hourArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

    const handleSelectSlot = useCallback(
        async({ start, end }) => {
          if (currentUser.user.admin === false) {
            return
          } else if (start < new Date(2022,8,20) || end > new Date(2025,8,20)) {
            return
          }
          setErrors([]);
          setShowModal(true);
          setParams({...params,
            startDate: `${start.getFullYear()}-${('0' + (start.getMonth() + 1)).slice(-2)}-${('0' + start.getDate()).slice( -2 )}`,
            startTime: `${('0' +start.getHours()).slice(-2)}:${('0' + start.getMinutes()).slice(-2)}`,
            endDate: `${end.getFullYear()}-${('0' + (end.getMonth() + 1)).slice(-2)}-${('0' + end.getDate()).slice( -2 )}`,
            endTime: `${('0' + end.getHours()).slice(-2)}:${('0' + end.getMinutes()).slice(-2)}`
          })
        },
        [params]
      )

    const openModal = () => {
        setErrors([]);
        setShowModal(true);
    }

    const handleSelectEvent = useCallback(
        (event) => {
            setShowInfo(true);
            setTargetId(event.id);
        },
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
                setParams({userId: currentUser.user.id,title: "", startDate: "", startTime: "", endDate: "", endTime: "", allDay: false, description: ""})
            } else {
                setErrors(res.data.errors)
            }
        } catch (e) {
            console.log(e);
        }
    }
    const accessor = (date) => {
        if (date < new Date(2022,8,20) || date >= new Date(2025,8,20)) {
            return {
                style: {
                    background: "gray"
                }
            }
        }
        if (moment(date).diff(new Date(2022,9,20), "days") === 0) {
        }

    }
console.log(params.startTime)
    return (
        <>
            <Div id="calendar">
                { currentUser.user.admin && <button onClick={()=>{openModal()}}>イベント追加</button> }
                <Calendar
                localizer={localizer}
                startAccessor="start"
                events={formatted}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                endAccessor="end"
                style={{ height: 600 }}
                dayPropGetter={(date)=>accessor(date)}
                step="60"
                length="30"
                components={{
                    toolbar: RBCToolbar
                }}
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
                    <input min="2022-09-20" max="2025-09-19" onChange={(e)=>handleChange(e.target.value,"startDate")} value={params.startDate} className="date" type="date" />
                    <select onChange={(e)=>handleChange(e.target.value,"startTime")} className="time" value={params.startTime} type="time" disabled={params.allDay} >
                        {hourArray.map((arr) => {
                            return <option value={("0" + arr).slice(-2) + ":00"}>{("0" + arr).slice(-2)}:00</option>
                        })}
                    </select>
                </p>
                <label>終了</label>
                <p>
                    <input min="2022-09-20" max="2025-09-19" onChange={(e)=>handleChange(e.target.value,"endDate")}  value={params.endDate} className="date" type="date" />
                    <select onChange={(e)=>handleChange(e.target.value,"endTime")} className="time" value={params.endTime} type="time" disabled={params.allDay} >
                        {hourArray.map((arr) => {
                            return <option value={("0" + arr).slice(-2) + ":00"}>{("0" + arr).slice(-2)}:00</option>
                        })}
                    </select>
                </p>
                <input type="checkBox" name="allDay" checked={params.allDay} value="true" onChange={(e)=>handleCheck(e)} /><span>終日</span>
                <label>説明</label>
                <textarea value={params.description} onChange={(e)=>handleChange(e.target.value,"description")} className="description" />
                <button className="submit" type="button" onClick={(e)=>handleSubmit(e)}>作成</button>
            </Modal>
            <ShowEvent eventId={targetId} showModal={showInfo} setShowModal={setShowInfo}/>
    </>
    )
}

const Div = styled.div`
    .rbc-current-time-indicator {
        z-index: 0;
    }
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
}
`
const ErrorMessage = styled.span`
  font-size: 0.8rem;
  display: block;
  background-color: ${Color.form};
`