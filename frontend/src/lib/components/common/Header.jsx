import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Color from './Color';
import { SignOutButton } from '../SignOutButton';
import { AuthContext  } from '../../../App';

export const Header = () => {
  const { isSignedIn } = useContext(AuthContext);

    return (
      <HeaderDiv>
        <LeftMenu>
            <li><SignOutButton /></li>
        </LeftMenu>
        <RightMenu>
          { isSignedIn &&
          <>
            <li><Link to="/mypage/info">マイページ</Link></li>
            <li><Link to="/news">News</Link></li>
          </>
          }
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
    float: right;
    margin: 0px 20px;
    background: ${Color.secondary};
    text-align: center;
    button {
        height: 40px;
    }
    a {
        display: block;
        height: 40px;
        padding: 0px;
        margin: 0px;
        min-width: 100px;
        line-height: 40px;
        text-decoration: none;
    }
`