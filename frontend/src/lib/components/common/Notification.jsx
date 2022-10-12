import React, { useState } from 'react'
import styled from "styled-components";
import Color from './Color';

export const Notification = () => {
    const [ notifications, setNotifications ] = useState([]);

    if ( notifications.length ) {
        return (
            <Img src={`${process.env.PUBLIC_URL}/notification_on.png`} alt="button" />
        )
    } else {
        return (
            <Img src={`${process.env.PUBLIC_URL}/notification_off.png`} alt="button" />
        )
    }

}

const Img = styled.img`
    height: 30px;
    padding-top: 5px;
    line-height: 40px;
`