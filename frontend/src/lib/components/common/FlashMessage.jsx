import React from 'react'
import styled from "styled-components";

export const FlashMessage = (props) => {
    const { message, type, showFlag, setShowFlag } = props;

    if (message) {
        return (
            <Display type={type} showFlag={showFlag}>
                <p>{message}<span onClick={()=>{setShowFlag(false)}}>✕</span></p>
            </Display>
        );
    }
}

const Display = styled.div`
    display: ${props=> props.showFlag === false && "none"};

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
    max-width: 70%;
    margin: 0 auto;
`