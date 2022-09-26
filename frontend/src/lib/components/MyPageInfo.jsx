import React, { useContext } from 'react';
import { AuthContext } from '../../App.jsx';
import styled from 'styled-components'

export const MyPageInfo = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <InfoDiv>
            <ul>
                <label>名前</label>
                <li>{currentUser.user.name}</li>
                <label>メールアドレス</label>
                <li>{currentUser.user.email}</li>
                <label>ユーザー種別</label>
                <li>{currentUser.user.admin ? "管理者": "一般"}</li>
                <label>所属セクション</label>
                    {Object.keys(currentUser.sections).map((key,value) => {
                    const tags = [<li className="sectionName">{key}</li>]
                    currentUser.sections[key].forEach((sec)=> tags.push(<span className="areaName">{sec.areas}</span>))
                    tags.push(<br/>)
                    return <div key={key}>{tags}</div>
                })}
            </ul>
        </InfoDiv>
    )
}

const InfoDiv = styled.div`
    ul {
        list-style: none;
        div {
            margin: 5px;
        }
    }
    .sectionName {
        color: green;
        min-width: 70px;
        text-align: center;
        border: solid 1px;
        padding: 5px;
        display: inline-block;
        margin-right: 10px;
    }
`