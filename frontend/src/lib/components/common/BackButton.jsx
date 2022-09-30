import React from 'react';
import { useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Color from '../common/Color'

export const BackButton = () => {
    const navigate = useNavigate();
    return ( <Button onClick={() =>{navigate(-1)}}>&lt; 戻る</Button>)
}

const Button = styled.button`
    display: block;
    background-color: ${Color.primary};
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
`