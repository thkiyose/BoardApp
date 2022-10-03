import React, { useEffect, useCallback } from 'react';
import {  useOutletContext } from 'react-router-dom';
import styled from 'styled-components'
import { IndexNews } from '../../api/news';
import { NewsCard } from '../common/NewsCard';

export const All = () => {
    const { news, setNews, activeKey, setActiveKey } = useOutletContext();

    const loadNews = useCallback(async() => {
      if (activeKey !== 0) {
        setActiveKey(0);
    }
        try {
            const res = await IndexNews(); 
            if (res.status === 200) {
                setNews(res.data.news);
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    },[setNews,activeKey, setActiveKey])
    useEffect(()=>{loadNews()},[loadNews,setNews]);

    return (
        <>
            {news.length > 0 ?
                news.map((n,index) => {
                    return <NewsCard key={index} news={n}/>
                }) : <NoNews>まだ記事がありません。</NoNews>}
        </>
    )
}

const NoNews = styled.p`
  margin: 0 auto;
  color: #fff;
  font-size: 1rem;
`
