import React, { useEffect, useMemo, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components'
import { SearchNews } from '../../api/news';
import { NewsCard } from '../common/NewsCard';

export const From = () => {
  const { news, setNews, currentUser, activeKey, setActiveKey  } = useOutletContext();

  const memorizedParams = useMemo(()=>{
    const arr = []
    Object.values(currentUser.sections).map((x)=>{
        return (
                x.map((child)=>{
                    return (arr.push(child.id))
                  })
                )
        })
        return arr
  },[currentUser])

      const handleSearch = useCallback(async(params) => {
        if (activeKey !== 2) {
          setActiveKey(2);
      }
          try {
              const res = await SearchNews(params); 
              if (res.status === 200) {
                  setNews(res.data.news);
              } else {
                console.log(res)
              }
            } catch (e) {
              console.log(e)
            }
      },[activeKey,setActiveKey,setNews])
  
      useEffect(()=>{handleSearch({fromIds: memorizedParams, fromUsers: currentUser.user.id })},[handleSearch,memorizedParams,currentUser.user.id]);

    return (
        <>
            {news.length > 0 ?
                news.map((n,index) => {
                    return <NewsCard key={index} news={n}/>
                }) : <NoNews>表示する記事がありません。</NoNews>}
        </>
    )
}

const NoNews = styled.p`
  margin: 0 auto;
  color: #fff;
  font-size: 1rem;
`