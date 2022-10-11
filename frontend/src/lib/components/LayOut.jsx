import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './common/Header';
import { Footer } from './common/Footer';
import Color from './common/Color';
import { FlashMessage } from './common/FlashMessage'

export const LayOut = () => {
    const location = useLocation();
    const [ message, setMessage ] = useState([]);
    const [ showMessage, setShowMessage ] = useState(false);
    console.log(location.state?.message)

    useEffect(()=>{
        location.state?.message && setMessage(location.state.message)
        setShowMessage(true);
        setTimeout(()=>{setMessage([]);
        setShowMessage(false)},2000)
    },[location.state?.message])

    return (
        <Screen>
            <FlashMessage message={message} showFlag={showMessage}/>
            <Header/>
            <Wrapper>
                <Outlet/>
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
    min-height: 100vh;
`

const Wrapper = styled.div`
    width: 100%;
    padding-top: 50px;
    margin: 0 auto;
`