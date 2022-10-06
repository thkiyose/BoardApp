import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import Color from './common/Color.jsx';
import styled from "styled-components";
import { SectionSelector } from './common/SectionSelector.jsx';
import { AuthContext  } from '../../App.jsx';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/ja';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CreateEvent } from '../api/event'
import { FetchEvents } from '../api/event'
import { Modal } from './common/Modal';
import { ShowEvent } from './ShowEvent'
import { DestroyEvent  } from '../api/event';
import RBCToolbar from './common/Toolbar';
import { EventSortBar } from './common/EventSortBar';

const localizer = momentLocalizer(moment)

export const Schedule = () => {
    const { currentUser, sections, rawSections,rawAreas } = useContext(AuthContext);
    const [selectedSection, setSelectedSection] = useState([]);
    const [selectedArea, setSelectedArea] = useState([]);
    const [events, setEvents] = useState([]);
    const [ targetId, setTargetId ] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
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
            return (arr.push({ id: event.id, title: event.title, start: new Date(event.start), end: new Date(event.end), allDay: event.allDay, section: event.section}))
       })
       return arr;
    },[events])

    const handleDestroyEvent = async(eventId) => {
        const result = window.confirm("このイベントを削除しますか？")
        if (result) {
            const res = await DestroyEvent(eventId)
            if (res.status === 200) {
                setShowInfo(false);
                loadEvents();
            } else {
                console.log(res)
            }
        }
    }

    const handleSelectSlot = useCallback(
        async({ start, end }) => {
          if (currentUser.user.admin === false) {
            return
          } else if (start < new Date(2022,8,20) || end > new Date(2025,8,20)) {
            return
          }
          setErrors([]);
          setSelectedArea([]);
          setSelectedSection([]);
          setShowModal(true);
          setParams({...params,
            startDate: `${start.getFullYear()}-${('0' + (start.getMonth() + 1)).slice(-2)}-${('0' + start.getDate()).slice( -2 )}`,
            startTime: `${('0' +start.getHours()).slice(-2)}:${('0' + start.getMinutes()).slice(-2)}`,
            endDate: `${end.getFullYear()}-${('0' + (end.getMonth() + 1)).slice(-2)}-${('0' + end.getDate()).slice( -2 )}`,
            endTime: `${('0' + end.getHours()).slice(-2)}:${('0' + end.getMinutes()).slice(-2)}`
          })
        },
        [params,currentUser.user.admin]
      )

    const openModal = () => {
        setErrors([]);
        setSelectedArea([]);
        setSelectedSection([]);
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
        if (selectedArea.length === 0) {
            setErrors(["セクション・エリアを選んで下さい。"])
            return;
        }
        const res = await CreateEvent({id: currentUser.user.id, event: params, sections: selectedArea}) 
        try {
            if (res.data.status === "success") {
                setShowModal(false)
                loadEvents();
                setParams({title: "", startDate: "", startTime: "", endDate: "", endTime: "", allDay: false, description: ""})
                setSelectedArea([]);
                setSelectedSection([]);
            } else {
                setErrors(res.data.errors)
            }
        } catch (e) {
            console.log(e);
        }
    }
    const dateAccessor = (date) => {
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

    const eventPropGetter = (event) => {
        let bgColor;
        switch (event.section) {
            case "Civil":
                bgColor = "#f43a7b";
                break;
            case "Building":
                bgColor = "#14b4ff";
                break;
            case "Mechanical":
                bgColor = "#39b269";
                break;
            case "Piping":
                bgColor = "#c1a14f";
                break;
            case "Electrical":
                bgColor = "#8d76a8";
                break;
            default:
                break;
        }
        return {
            style: {
                backgroundColor : bgColor
            }
        }
    }

    return (
        <>
            <Div id="calendar">
                { currentUser.user.admin && <AddButton onClick={()=>{openModal()}}>イベント追加</AddButton> }
                <EventSortBar sections={rawSections} areas={rawAreas} setEvents={setEvents} />
                <Calendar
                localizer={localizer}
                startAccessor="start"
                events={formatted}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                endAccessor="end"
                style={{ height: 600 }}
                dayPropGetter={(date)=>dateAccessor(date)}
                eventPropGetter={(event)=>eventPropGetter(event)}
                step="60"
                length="30"
                components={{
                    toolbar: RBCToolbar
                }}
                />
            </Div>
            <Modal onClick={(e)=>e.stopPropagation()} showFlag={showModal} setShowModal={setShowModal}>
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
                <Submit className="submit" type="button" onClick={(e)=>handleSubmit(e)}>作成</Submit>
            </Modal>
            <ShowEvent eventId={targetId} showModal={showInfo} setShowModal={setShowInfo} handleDestroyEvent={handleDestroyEvent}/>
    </>
    )
}

const Div = styled.div`
    margin: 0 auto;
    padding-top: 20px;
    width: 90%;
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

const AddButton = styled.button`
    float: right;
`