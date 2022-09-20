import React from 'react';
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';

export const LayOut = () => {
    return (
        <Screen>
            <Outlet />
        </Screen>
    )
}

const Screen = styled.div``