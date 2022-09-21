import React from 'react'
import styled from "styled-components";
import Color from './Color';

export const FlashMessage = (props) => {
    const { message, type } = props;
    if (message) {
        render <p>{message}</p>
    }
}