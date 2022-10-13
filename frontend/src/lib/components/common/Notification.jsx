import React, { useState } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Check } from '../../api/notification';
import Color from './Color';
import moment from 'moment';

export const Notification = (props) => {
    const { notifications, setNotifications } = props;
    const [ showFlag, setShowFlag ] = useState(false)

    const handleShow = async() => {
        setShowFlag(!showFlag);
        if ( showFlag === false && notifications.length) {
            const arr = notifications.map((n)=>{
                return n.id
            })
            await Check(arr);
        } else if ( showFlag === true ) {
            setNotifications([]);
        }
    }

    if ( notifications.length ) {
        return (
            <>
                <Img onClick={()=>{handleShow()}} src={`${process.env.PUBLIC_URL}/notification_on.png`} alt="button" />
                { showFlag && <PopUp notifications={notifications} />}
            </>
        )
    } else {
        return (
            <>
                <Img onClick={()=>{handleShow()}}  src={`${process.env.PUBLIC_URL}/notification_off.png`} alt="button" />
                { showFlag && <PopUp notifications={notifications}/> }
          </>
        )
    }

}

const Img = styled.img`
    height: 30px;
    padding-top: 5px;
    line-height: 40px;
    cursor: pointer;
`

const PopUp = (props) => {
    const { notifications } = props;

    return (
        <PopUpDiv>
            <div className="popUpChild">
                { notifications?.length > 0 ? 
                    notifications.map((n, index)=>{
                        return (
                            <div key={index} className="notification">
                                <p>{(moment(n.createdAt).format("YYYY年MM月DD日 HH時mm分"))}</p>
                                <p>あなた宛の新しいNewsが投稿されました。</p>
                                <Link to={`news/${n.newsId}`}>確認する:{n.title}</Link>
                            </div> 
                        )
                    })
                : <p>通知はありません。</p>}
            </div>
        </PopUpDiv>
    )
}

const PopUpDiv = styled.div`
    position: relative;
    .popUpChild {
        position: absolute;
        right: 10px;
        width: 300px;
        max-height: 80vh;
        overflow: scroll;
        padding: 10px;
        z-index: 9999;
        text-align: left;
        -webkit-filter:drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3));
        background: ${Color.form};
        font-size: 0.7rem;
        .notification {
            border-bottom: solid 1px gray;
            p {
                padding: 0;
                margin: 0;
            }
            a {
                display: inline;
                margin: 0;
                padding: 0;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
`