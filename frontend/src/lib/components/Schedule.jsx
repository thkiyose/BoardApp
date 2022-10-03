import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/ja';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

export const Schedule = () => {

    return (
        <div>
            <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            />
      </div>
    )
}