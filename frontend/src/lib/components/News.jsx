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
               {currentUser.user.admin === true && <CreateButton/> }
            </Div>
            <Outlet/>
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
    margin: 0;
    float: left;
    width: 20%;
    height: 100vh;
`

const CreateLink = styled(Link)`
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 50%;
    line-height: 70px;
    text-align: center;
    text-decoration: none;
    display: block;
    cursor: pointer;
    width: 70px;
    height: 70px;
    padding: 0;
    border: none;
    background: ${Color.primary};
    color: white;
    :hover {
        -webkit-transform: translate(0, 3px);
        transform: translate(0, 3px);

      }
`
