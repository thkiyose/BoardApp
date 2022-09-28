import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, Link } from "react-router-dom"
import { FlashMessage } from './common/FlashMessage';
import Color from '../components/common/Color';

export const News = (props) => {
    const location = useLocation();
    const [ message, setMessage ] = useState([]);
    const navigate = useNavigate();
    
    return (<Div>
        <FlashMessage message={message} type={"success"} />
        <CreateButton/>
    </Div>)
}

const CreateButton = () => {
    
    return (
        <CreateLink to="create">
            新規投稿
        </CreateLink>
    )
}

const Div = styled.div`
    margin-top: 10px;
`

const CreateLink = styled(Link)`
    border-radius: 50%;
    line-height: 70px;
    text-align: center;
    text-decoration: none;
    display: block;
    cursor: pointer;
    width: 70px;
    height: 70px;
    padding: 0;
    border: none;
    background: ${Color.primary};
    color: white;
    :hover {
        -webkit-transform: translate(0, 3px);
        transform: translate(0, 3px);

      }
`