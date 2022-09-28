import React from 'react';
import styled from 'styled-components'
import Color from './Color';
import { useNavigate } from 'react-router-dom';

export const NewsCard = (props) => {
    const { news } = props;
    const navigate = useNavigate();

    return (
        <Card onClick={()=>navigate(`/news/${news.id}`)}>
            <Image/>
            <Text>
                <h3>{news.title}</h3>
                <span>{news.createdAt}</span>
                <div>{news.content}</div>
            </Text>
        </Card>
    )
}

const Card = styled.div`
    background: white;
    cursor: pointer;
    width: 30%;
    height: 200px;
    margin: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const Text = styled.div`
    margin: 0;
    h3 {
        margin: 3px 0px;
        font-weight: light;
    }
    div {
        width: 100%;
        height: 90%;
        margin: 0px;
        overflow-wrap: break-word;
    }
    width: 90%;
    height: 47%;
    margin: 0 auto;
    overflow: hidden;
`

const Image = styled.div`
    background: gray;
    height: 50%;
    margin: 0;
`