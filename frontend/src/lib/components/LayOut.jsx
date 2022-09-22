import React, { useState } from 'react';
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';
import { Header } from './common/Header';
import Color from './common/Color';
import { FlashMessage } from './common/FlashMessage';

export const LayOut = () => {
    const [ message, setMessage ] = useState([]);
    const [ showFlag, setShowFlag ] = useState(false);

    return (
        <Screen>
            <Header />
            <Wrapper>
            { 
                message.map((msg, index) => {
                    return (
                        <FlashMessage key={index} message={msg} type={"warning"} showFlag={showFlag} setShowFlag={setShowFlag} />
                    );
                })
             }
                <Outlet context={[setMessage, setShowFlag]}/>
            </Wrapper>
        </Screen>
    )
}

const Screen = styled.div`
    background-color: ${Color.bg};;
    margin: 0;
    padding: 0;
    width: 100%;
    font-size: 0.9rem;
    min-height: 100vh;
`

const Wrapper = styled.div`
    width: 80%;
    padding-top: 100px;
    margin: 0 auto;
`