import React from 'react';
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';
import { Header } from './common/Header';
import Color from './common/Color';

export const LayOut = () => {
    return (
        <Screen>
            <Header />
            <Wrapper><Outlet /></Wrapper>
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