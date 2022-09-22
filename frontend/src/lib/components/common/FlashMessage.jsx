import React from 'react'
import styled from "styled-components";
import Color from './Color';

export const FlashMessage = (props) => {
    const { message, type } = props;
    if (message) {
        return (
            <Display type={type}>
                <p>{message}</p>
            </Display>
        );
    }
}

const Display = styled.div`
    p {
        background-color: ${props => props.type === "warning" && "#f9b9be"};
        border: ${props => props.type === "warning" && "solid 1px red" };
        text-align: center;
        padding: 10px;
    }  
    max-width: 70%;
    margin: 0 auto;
`