import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { ShowNews } from '../api/news';
import { BackButton } from './common/BackButton';

export const NewsInfo = () => {
    const [ news, setNews ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    const newsId = useParams();

    const FetchNews = async(newsId) => {
        try {
            const res = await ShowNews(newsId); 
            if (res.status === 200) {
                setNews(res.data);
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
          setIsLoading(false);
    }
    useEffect(()=>{FetchNews(newsId.id)},[newsId.id]);
    if ( !isLoading && news.news ) {
        const content = news.news.content.split("\n").map((item, index) => {
            return (
              <React.Fragment key={index}>{item}<br /></React.Fragment>
            );
          });
        return (
                <Div>
                    <BackButton/>
                    <h1>{news.news.title}</h1>
                    <p className="dayTime">{news.news.createdAt}</p>
                    <p>{content}</p>
                </Div>
        )
    }
}

const Div = styled.div`
    padding: 20px 30px;
    background: white;
    float: left;
    width: 70%;
    font-size: 0.8rem;
    min-height: 100px;
    margin: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    h1 {
        margin-top: 20px;
    }
    .dayTime {
        color:gray;
    }
`