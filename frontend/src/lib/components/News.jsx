import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext  } from '../../App';
import { Link, Outlet } from "react-router-dom"
import Color from '../components/common/Color';

export const News = (props) => {
    // const location = useLocation();
    const { currentUser } = useContext(AuthContext);
    // const [ message ] = useState(location.state ?  [location.state.message] : []);
    
    return (
        <>
            <Div>
                <Wrapper>
                    {currentUser.user.admin === true && <CreateButton/> }
                    <MenuList>
                    <li><Link to="index/all">ブラウズ</Link></li>
                    <li><Link to="">投稿履歴</Link></li>
                    <li><Link to="">アーカイブ</Link></li>
                    </MenuList>
                </Wrapper>
            </Div>
            <OutletWrapper>
                <Outlet context={currentUser}/>
            </OutletWrapper>
        </>
    )
}

const CreateButton = () => {
    
    return (
            <CreateLink to="create">
                新規投稿
            </CreateLink>
    )
}

const Div = styled.div`
    margin-top: 20px;
    float: left;
    width: 20%;
    min-height: 75vh;
`

const Wrapper = styled.div`
    margin: 0 auto;
    width: 90%;
`

const OutletWrapper = styled.div`
    margin: 0 auto;
    width: 80%;
    float: right;
`

const CreateLink = styled(Link)`
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    text-decoration: none;
    display: block;
    cursor: pointer;
    width: 50%;
    height: 40px;
    padding: 0;
    margin: 0 auto;
    border: none;
    text-align: center;
    background: ${Color.primary};
    color: white;
    :hover {
        -webkit-transform: translate(0, 3px);
        transform: translate(0, 3px);

      }
`

const MenuList = styled.ul`
      list-style: none;
      padding: 0;
      width: 90%;
      margin: 0 auto;
      li {
        width: 100%;
        background: #e0e0e0;
        padding: 15px 0px;
        text-align: center;
        margin: 20px 0px;
      }
      li:hover {
        background: #c4c4c4;
      }
      a {
        width: 100%;
        display: block;
        text-decoration: none;
        color:inherit;
      }
`
