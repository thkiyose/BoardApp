import React from 'react';
import styled from 'styled-components'

export const FlashMessage = (props) => {
    const { message, showFlag } = props;
    if (message && showFlag) {
        return (
        <Div showFlag={showFlag}>{message}</Div>
      )
    }
}

const Div = styled.div`
    position: fixed;
    background: #7ed6ce;
    width: 50%;
    color: #fff;
    line-height: 30px;
    text-align: center;
    left: 50%;
    z-index: 9999;
    border-radius: 20px;
    transform: translate(-50%);
    background: ${(props) => (props.showFlag ? 1 : 0)};
    animation: fadeOut 2s ease 1 normal;
    @keyframes fadeOut {
        0% {opacity: 1}
        50% {opacity: 1}
        100% {opacity: 0}
    }
`