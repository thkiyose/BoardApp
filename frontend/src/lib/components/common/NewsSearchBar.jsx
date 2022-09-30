import React, { useState, useEffect, useContext } from 'react';
import Color from './Color';
import styled from 'styled-components'
import { AuthContext  } from '../../../App';

export const NewsSearchBar = () => {
    const [ textQuery, setTextQuery ] = useState("");
    const [ fromQuery, setFromQuery ] = useState({section: "", area: ""});
    const [ toQuery, setToQuery  ] = useState({section: "", area: ""});
    const [ date, setDate ] = useState({start:"", end: ""})

    return (
        <SearchBar>
            <table>
                <tbody>
                    <tr><th></th><td><label>タイトル</label><input className="title"></input></td></tr>
                    <tr><th></th><td><label>本文</label><input className="content"></input></td></tr>
                   <tr><th><span>作成日:</span></th><td><label>開始</label><input type="date" className="date"></input><label>終了</label><input type="date" className="date"></input></td></tr>
                   <tr><th><span>To:</span></th><td><label>セクション</label><input className="section"></input><label>エリア</label><input className="area"></input></td></tr>
                   <tr><th><span>From:</span></th><td><label>セクション</label><input className="section"></input><label>エリア</label><input className="area"></input></td></tr>
                </tbody>
            </table>
        </SearchBar>
    )
}

const SearchBar = styled.div`
    width: 90%;
    margin: 0 auto;
    color: white;
    table {
        width: 100%;
    }

    th {
        width: 10%;
    }
    td {
        width: 90%;
    }
    span {
        margin-right: 10px;
    }
    label {
        padding: 7px;
        background: ${Color.primary}
    }
    input {
        padding: 5px;
        line-height: 10px;
        border: none;
        margin: 5px;
    }
    .title {
        width: 30%;
    }
    .content {
        width: 80%;
    }
    .date {
        width: 30%;
    }
    .section {
        width: 30%;
    }
    .area {
        width: 30%;
    }
`