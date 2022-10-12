import React, { useState, useContext } from 'react'
import styled from "styled-components";
import { AuthContext } from '../../../App';
import { FetchNotifications } from '../../api/notification';
import Color from './Color';

export const Notification = () => {
    const { currentUser } = useContext(AuthContext);
    const [ notifications, setNotifications ] = useState([]);

    const handleShowNotifications = async(userId) => {
        const res = await FetchNotifications(userId)
        console.log(res)
    }

    if ( notifications.length ) {
        return (
            <Img onClick={()=>handleShowNotifications(currentUser.user.id)} src={`${process.env.PUBLIC_URL}/notification_on.png`} alt="button" />
        )
    } else {
        return (
            <Img onClick={()=>handleShowNotifications(currentUser.user.id)} src={`${process.env.PUBLIC_URL}/notification_off.png`} alt="button" />
        )
    }

}

const Img = styled.img`
    height: 30px;
    padding-top: 5px;
    line-height: 40px;
`