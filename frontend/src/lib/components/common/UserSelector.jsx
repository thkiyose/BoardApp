import React, { useState } from 'react'
import styled from "styled-components";
import Color from './Color';
import { Modal } from './Modal';

export const UserSelector = (props) => {
    const { selectedUsers, setSelectedUsers } = props;
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <UserSelectButton type="button" onClick={()=>{setShowModal(true)}}>ユーザーを選択</UserSelectButton>
            <Modal showFlag={showModal} setShowModal={setShowModal}>
                <UserSearchBar/>
                <SearchResult/>
            </Modal>
        </>
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

const UserSearchBar = () => {
    return (
        <SearchDiv>
            <input type="text" placeholder="ユーザーの名前かメールアドレスを入力"></input>
        </SearchDiv>
    )
}

const SearchDiv = styled.div`
    width: 100%;
    input {
        width: 100%;
    }
`
const SearchResult = (props) => {
    const { users, setSelectedUsers } = props;

    return (
        <ResultDiv>
            {users && users.map((user)=>{
                return <p>{user.name}</p>
            })}
        </ResultDiv>
    )
}

const ResultDiv = styled.div`
    width: 100%;
`