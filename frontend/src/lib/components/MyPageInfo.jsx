import React, { useContext } from 'react';
import { AuthContext } from '../../App.jsx';
import styled from 'styled-components'

export const MyPageInfo = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <InfoDiv>
            <ul>
                <label>名前</label>
                <li>{currentUser.name}</li>
                <label>メールアドレス</label>
                <li>{currentUser.email}</li>
                <label>ユーザー種別</label>
                <li>{currentUser.email}</li>
            </ul>
        </InfoDiv>
    )
}

const InfoDiv = styled.div`
    ul {
        list-style: none;
    }
`