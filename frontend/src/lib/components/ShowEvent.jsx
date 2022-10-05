import React, { useState, useEffect, useCallback, useContext } from 'react';
import Color from './common/Color.jsx';
import styled from "styled-components";
import { AuthContext  } from '../../App.jsx';
import { Modal } from './common/Modal';
import { FetchEvent  } from '../api/event.js';
import moment from 'moment';

export const ShowEvent = (props) => {
    const { eventId, showModal, setShowModal, handleDestroyEvent } = props;
    const [ event, setEvent ] = useState();
    const { currentUser } = useContext(AuthContext);

    const loadEvent = useCallback(async() => {
        try {
            const res = await FetchEvent(eventId)
            if (res.status === 200) {
                setEvent(res.data.event)
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    },[eventId])

    useEffect(()=>{loadEvent()},[setEvent,loadEvent])

    const description = event?.event ?
        event.event.description.split("\n").map((item, index) => {
            return (
                <React.Fragment key={index}>{item}<br /></React.Fragment>
            );
        }) : ""

    return (
        <Modal showFlag={showModal} setShowModal={setShowModal}>
            {event?.sections &&
                <>
                    <User><Label>作成者</Label>{event.user.name}:{event.user.email}</User>{event.user.id === currentUser.user.id && <Menu><button>編集</button><button onClick={()=>{handleDestroyEvent(eventId)}}>削除</button></Menu>}
                    <InfoTable>
                        <tbody>
                            <tr><th>タイトル</th><td>{event.event.title}</td></tr>
                            <tr><th>開始</th><td>{(moment(event.event.start).format("YYYY年MM月DD日 HH時mm分"))}</td></tr>
                            <tr><th>終了</th><td>{(moment(event.event.end).format("YYYY年MM月DD日 HH時mm分"))}</td></tr>
                            <tr><th></th><td className="allDay">{event.event.allDay ? "終日" : ""}</td></tr>
                            <tr><th>メモ</th><td className='description'>{description}</td></tr>
                        </tbody>
                    </InfoTable>
                    <p>
                        <span>セクション・エリア</span>
                        {event?.sections.map((x,index) => {
                            return (
                            <SectionArea key={index}>
                                <span>{x[0].sections}:</span>
                                {x.map((child,index) => {
                                return <span className="area" key={index}>{child.areas}</span>;
                                })}
                            </SectionArea>
                            );
                        })}
                    </p>
                </>
            }
        </Modal>
    )
}

const InfoTable = styled.table`
    width: 100%;
    padding-bottom: 20px;
    border-collapse: collapse;
    th {
        background: ${Color.primary};
        color: #fff;
        font-weight: normal;
        padding: 10px 0px;
        width: 15%;
    }
    td {
        text-align: center;
        background: #fff;
    }

    .description {
        text-align: center;
    }
`
const Label = styled.span`
    background: ${Color.primary};
    padding: 5px;
    border-radius: 20px;
    color: #fff;
`

const User = styled.p`
    width: 70%;
    float: left;
`

const Menu = styled.p`
    text-align :center;
    button {
        margin-left: 9px;
    }
`
const SectionArea = styled.span`
    background: ${Color.secondary};
    color: white;
    padding: 5px;
    margin-left: 5px;
    border-radius: 5px;
    .area {
        margin-left: 3px;
        background: ${Color.primary};
        padding: 5px;
        border-radius: 10px;
    }
`