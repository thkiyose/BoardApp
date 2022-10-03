import React, { useState } from 'react';
import Color from './common/Color.jsx';
import styled from "styled-components";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/ja';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

export const Schedule = () => {

    return (
        <Div>
            <Calendar
            localizer={localizer}
            startAccessor="start"
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

`