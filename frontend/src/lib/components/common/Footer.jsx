import React from 'react'
import styled from "styled-components";
import Color from './Color';

const FooterDiv = styled.div`
  background-color: ${Color.dark};
  color: #fff;
  text-align: center;
  height: 70px;
  margin-top: 70px;
`

export const Footer = () => {

  return (
    <>
    <FooterDiv>
      <p>2022 Tezuka</p>
    </FooterDiv>
    </>
  )
};
