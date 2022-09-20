import React from 'react'
import styled from "styled-components";
import Color from './Color';

export const Header = () => {
    return (
      <HeaderDiv>
      </HeaderDiv>
    )
  };

  const HeaderDiv = styled.div`
  background-color: ${Color.primary};
  z-index: 1000;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
`