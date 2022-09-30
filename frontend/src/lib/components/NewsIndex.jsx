import React, { useState, useEffect } from 'react';
import Color from './common/Color';
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
        <>
            <Tab/>
            <Div>
                {news.map((n,index)=>{
                    return (
                        <NewsCard key={index} news={n}/>
                    )
                })}
            </Div>
        </>
    )
}

const Div = styled.div`
    padding: 20px 0px;
    display: flex;
    flex-wrap : wrap;
    width: 80%;
    background: ${Color.secondary};
    justify-content: stretch; 
`

const Tab = () => {

    return (
        <TabDiv className="tabs">
            <label className="tab_item">全て</label>
            <label className="tab_item">自分の所属</label>
            <label className="tab_item">検索</label>
        </TabDiv>
    )
}

const TabDiv = styled.div`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 0 auto;
  .tab_item {
    width: 10%;
    height: 40px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: gray;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 0.9rem;
    display: block;
    float: left;
    text-align: center;
    transition: all 0.2s ease;
  }
  .tab_item:hover {
    opacity: 0.75;
  }
  input[name="tab_item"] {
    display: none;
  }
`