import React, { useState } from 'react'
import styled from "styled-components";

export const FlashMessage = (props) => {
    const { message } = props;
console.log(props)
    if ( message.length > 0) {
        message.map((msg,key)=> {
            return (
                <Display key={key}>
                    <p>{msg}</p>
                </Display>)
        })
    }
}

const Display = styled.div`
    p {
        background-color: ${props => props.type === "warning" && '#f9b9be'};
        border: ${props => props.type === "warning" && "solid 1px red" };
        background-color: ${props => props.type === "success" && '#bfd3ad'};
        border: ${props => props.type === "success" && "solid 1px green" };
        text-align: center;
        padding: 10px;
        span {
            float:right;
            cursor: pointer;
        }
    }  
    margin: 0 auto;
`