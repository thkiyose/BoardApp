import React from 'react'
import styled from "styled-components";
import Color from './Color';
import { SignOutButton } from '../SignOutButton';

export const Header = () => {
    return (
      <HeaderDiv>
        <ul>
            <li><SignOutButton /></li>
        </ul>
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
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    height: 60px;
    margin: 0px 20px;
    button {
        height: 60px;
    }
  }
`