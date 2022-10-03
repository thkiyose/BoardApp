import React, { useState, useCallback } from 'react';
import Color from './common/Color.jsx';
import styled from "styled-components";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/ja';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

export const Schedule = () => {
    const [events, setEvents] = useState([{start: "2022-09-13T07:00:00.000Z", end: "2022-09-13T07:00:00.000Z", title:"aaa", allDay: true}]);

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
          const title = window.prompt('New Event Name')
          if (title) {
            setEvents((prev) => [...prev, { start, end, title }])
          }
        },
        [setEvents]
      )

      const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
      )
console.log(events)
    return (
        <Div>
            <button>イベント追加</button>
            <Calendar
            localizer={localizer}
            startAccessor="start"
            events={events}
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