import React, { useState } from 'react';
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';
import { Header } from './common/Header';
import { Footer } from './common/Footer';
import Color from './common/Color';
import { FlashMessage } from './common/FlashMessage';

export const LayOut = () => {
    const [ message, setMessage ] = useState([]);

    return (
        <Screen>
            <Header />
            <Wrapper>
                <FlashMessage message={message} />
                <Outlet context={[message, setMessage]}/>
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