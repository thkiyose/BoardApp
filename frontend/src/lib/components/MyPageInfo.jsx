import React, { useContext } from 'react';
import { AuthContext } from '../../App.jsx';
import styled from 'styled-components'
import Color from './common/Color.jsx';

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
                <label className="secLabel">所属セクション</label>
                {Object.keys(currentUser.sections).map((key)=>{
                    const children = []
                    currentUser.sections[key].forEach((sec,index)=>{
                       children.push(<span key={index} className="area">{sec.areas}</span>);
                    })
                    const li = React.createElement("li", {key: key, className:"secArea"}, <SectionArea>{key}:{[...children]}</SectionArea>)
                    return li;
                })
                }         
            </ul>
        </InfoDiv>
    )
}

const InfoDiv = styled.div`
    ul {
        list-style: none;
    }
    .secLabel {
        display: block;
        margin-bottom: 5px;
    }
    .secArea {
        margin: 10px 0px;
    }
`
const SectionArea = styled.span`
    background: ${Color.secondary};
    color: white;
    padding: 5px;
    margin-left: 5px;
    border-radius: 5px;
    .area {
        margin-left: 3px;
        background: ${Color.primary};
        padding: 5px;
        border-radius: 10px;
    }
`