import React, { useContext } from 'react';
import { AuthContext } from '../../App.jsx';
import styled from 'styled-components'

export const MyPage = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <>
            <SideMenu>
            </SideMenu>
            <Content>
            </Content>
        </>
    )
}
const SideMenu = styled.div`
    min-height: 70vh;
    float: left;
    width: 25%;
`
const Content = styled.div`
    padding: 10px;
`