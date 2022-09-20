import React from 'react';
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';
import Color from './common/Color';

export const LayOut = () => {
    return (
        <Screen>
            <Outlet />
        </Screen>
    )
}

const Screen = styled.div`
    background-color: ${Color.bg};;
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
`