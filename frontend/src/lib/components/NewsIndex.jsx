import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { IndexNews } from '../api/news';
import { NewsCard } from './common/NewsCard';

export const NewsIndex = () => {
    const [ news, setNews ] = useState([]);

    const LoadNews = async() => {
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
    }
    useEffect(()=>{LoadNews()},[setNews]);

    return (
        <Div>
            {news.map((n)=>{
                return (
                    <NewsCard news={n}/>
                )
            })}
        </Div>
    )
}

const Div = styled.div`
    width: 60%;
    margin: 0 auto;
`