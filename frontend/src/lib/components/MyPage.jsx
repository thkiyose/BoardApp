import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';
import styled from 'styled-components'

export const MyPage = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <>
            <SideMenu>
                <p>{currentUser.name}</p>
                <p>{currentUser.email}</p>
            </SideMenu>
            <Content>
                <Outlet />
            </Content>
        </>
    )
}
const SideMenu = styled.div`
    min-height: 80vh;
    float: left;
    width: 25%;
`
const Content = styled.div`
    padding: 10px;
`