import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Color from './Color';
import { SignOutButton } from '../SignOutButton';

export const Header = () => {
    return (
      <HeaderDiv>
        <LeftMenu>
            <li><SignOutButton /></li>
        </LeftMenu>
        <RightMenu>
            <li><Link to="/mypage/info">マイページ</Link></li>
        </RightMenu>
      </HeaderDiv>
    )
  };

  const HeaderDiv = styled.div`
    background-color: ${Color.primary};
    z-index: 1000;
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
`

const LeftMenu = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    float: left;
  li {
    height: 40px;
    margin: 0px 20px;
    button {
        height: 40px;
    }
`

const RightMenu = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    float: right;
  li {
    height: 40px;
    margin: 0px 20px;
    background: ${Color.secondary};
    cursor: pointer;
    text-align: center;
    min-width: 100px;
    button {
        height: 40px;
    }
    a {
        display: block;
        height: 40px;
        margin: 0px 20px;
        line-height: 40px;
        text-decoration: none;
    }
`