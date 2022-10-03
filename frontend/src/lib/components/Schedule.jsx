import React, { useState, useCallback, useMemo } from 'react';
import Color from './common/Color.jsx';
import styled from "styled-components";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/ja';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CreateEvent } from '../api/event'

const localizer = momentLocalizer(moment)

export const Schedule = () => {
    const [events, setEvents] = useState([{}]);

    const formatted = useMemo(()=>{
        events.map((event)=>{
            return ({ title: event.title, start: new Date(event.start), end: new Date(event.end), allDay: event.allDay})
       })
    },[events,setEvents])

    const handleSelectSlot = useCallback(
        async({ start, end }) => {
          const title = window.prompt('New Event Name')
          if (title) {
            const res = await CreateEvent({title: title, start: start, end: end}) 
            if (res.status === 200) {
                setEvents((prev) => [...prev, { start, end, title }])
            } else {
                console.log(res)
            }
          }
        },
        [setEvents]
      )

      const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
      )

    return (
        <Div>
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

`