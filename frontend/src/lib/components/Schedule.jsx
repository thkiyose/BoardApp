import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Color from './common/Color.jsx';
import styled from "styled-components";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/ja';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import { CreateEvent } from '../api/event'
import { FetchEvents } from '../api/event'

const localizer = momentLocalizer(moment)

export const Schedule = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [params, setParams] = useState({});

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

    const handleSelectSlot = useCallback(
        async({ start, end }) => {
          setShowModal(true);
        //   if (title) {
        //     const res = await CreateEvent({title: title, start: start, end: end}) 
        //     if (res.status === 200) {
        //         setEvents((prev) => [...prev, { start, end, title }])
        //     } else {
        //         console.log(res)
        //     }
        //   }
        },
        [setEvents]
      )

      const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
      )

    return (
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
            <ScheduleModal showModal={showModal} setShowModal={setShowModal}/>
      </Div>
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

const ScheduleModal = (props) => {
    const { showModal, setShowModal } = props;
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          minWidth: '80%',
          background: `${Color.bg}`,
          transform: 'translate(-50%, -50%)'
        },
        overlay: {
            background: 'rgb(0,0,0,0.5)'
        }
      };
  
    const closeModal = () => {
      setShowModal(false);
    }

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
            areaHideApp={false}
        >
            <InsideMordal>
                <h2>イベント作成</h2>
                <form>
                <label>タイトル</label>
                <input />
                <label>開始</label>
                <input />
                <label>終了</label>
                <input />
                <input type="checkBox" name="allDay" />
                <span>終日</span>
                </form>
            </InsideMordal>
        </Modal>
    );
}

const InsideMordal = styled.div`
    font-size: 0.8rem;
    h2 {
        text-align: center;
    }
    label {
        display: block;
        margin-left: 10%;
        margin-top: 20px;
    }
    input {
        margin-left: 10%;
        width: 80%;
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
`