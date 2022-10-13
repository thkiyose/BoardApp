import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components'
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './common/Header';
import { Footer } from './common/Footer';
import Color from './common/Color';
import { FlashMessage } from './common/FlashMessage'
import { FetchNotifications } from '../api/notification';
import { AuthContext } from '../../App';

export const NotificationContext = React.createContext("");

export const LayOut = () => {
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);
    const [ notifications, setNotifications ] = useState([]);
    const [ message, setMessage ] = useState([]);
    const [ showMessage, setShowMessage ] = useState(false);

    useEffect(()=>{
        location.state?.message && setMessage(location.state.message)
        setShowMessage(true);
        setTimeout(()=>{setMessage([]);
        setShowMessage(false)},1500)
    },[location.state?.message])

    const getNotification = useCallback(async(userId)=>{
        const res = await FetchNotifications(userId);
        setNotifications(res.data.notifications);
    },[])

    useEffect(()=>{getNotification(currentUser.user.id)},[currentUser.user.id, getNotification])

    return (
        <Screen>
            <FlashMessage message={message} showFlag={showMessage}/>
            <Header notifications={notifications} setNotifications={setNotifications}/>
            <Wrapper>
                <NotificationContext.Provider value={{setNotifications}}>
                   <Outlet/>
                </NotificationContext.Provider>
            </Wrapper>
            <Footer/>
        </Screen>
    )
}

const Screen = styled.div`
    background-color: ${Color.bg};;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-flow: column;
    font-size: 0.8rem;
    min-height: 80vh;
`

const Wrapper = styled.div`
    width: 100%;
    padding-top: 50px;
    margin: 0 auto;
`