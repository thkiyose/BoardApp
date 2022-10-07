import React from 'react'
import styled from "styled-components";
import Color from './Color';

export const UserSelector = (props) => {
    const { selectedUser } = props;

    return (
        <UserSelectButton type="button">ユーザーを選択</UserSelectButton>
    )
}

const UserSelectButton = styled.button`
    display: inline;
    margin-bottom: 10px;
    border: solid 1px black;
    :hover {
        background: ${Color.primary};
        color: #fff;
        border: solid 1px ${Color.primary};
    }
`