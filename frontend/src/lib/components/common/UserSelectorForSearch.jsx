import React, { useState } from 'react'
import styled from "styled-components";
import Color from './Color';
import { Modal } from './Modal';
import { SearchUser } from '../../api/user';

export const UserSelectorForSearch = (props) => {
    const { selectedUsers, setSelectedUsers, type } = props;
    const [ searchedUsers, setSearchedUsers ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);

    const handleSearch = async(e) => {
        try {
            const res = await SearchUser({word: e.target.value});
            if ( res.status === 200 ) {
                setSearchedUsers(res.data.users);
            }

        } catch(e) {
            console.log(e);
        }

    }
    if (selectedUsers === "") {
        return (
            <>
                <UserSelectButton type="button" onClick={()=>{setShowModal(true)}}>ユーザーを選択</UserSelectButton>
                <Modal showFlag={showModal} setShowModal={setShowModal} resetState={setSearchedUsers}>
                    <UserSearchBar handleSearch={handleSearch} />
                    <SearchResult type={type} users={searchedUsers} setSearchedUsers={setSearchedUsers} setSelectedUsers={setSelectedUsers} setShowModal={setShowModal} />
                </Modal>
            </>
        )
    }
}

const UserSelectButton = styled.button`
    display: inline;
    margin-bottom: 10px;
    border: solid 1px black;
    cursor: pointer;
    :hover {
        background: ${Color.primary};
        color: #fff;
        border: solid 1px ${Color.primary};
    }
`

const UserSearchBar = (props) => {
    const { handleSearch } = props;
    return (
        <SearchDiv>
            <input onChange={(e)=>handleSearch(e)}type="text" placeholder="ユーザーの名前かメールアドレスを入力"></input>
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
    const { users, setSelectedUsers, setShowModal, setSearchedUsers, type } = props;

    const handleSelect = (user) => {
        setSelectedUsers([ user.id, user.name, user.email ], type)
        setShowModal(false);
        setSearchedUsers("");
    }

    return (
        <ResultDiv>
            {users && users.map((user,index)=>{
                return <button type="button" onClick={()=>handleSelect(user)} key={index}>{user.name}&lt;{user.email}&gt;</button>
            })}
        </ResultDiv>
    )
}

const ResultDiv = styled.div`
    width: 100%;
    padding-top: 20px;
    button {
        padding: 5px;
        background: #fff;
        border: solid 1px ${Color.primary};
        margin: 3px;
    }
    button:hover {
        background: ${Color.primary};
        color: #fff;
        cursor: pointer;
    }
`