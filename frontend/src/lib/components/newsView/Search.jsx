import React, { useState,useEffect, useMemo, useCallback } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { SearchNews } from '../../api/news';
import { NewsCard } from '../common/NewsCard';
import { NewsSearchBar } from '../common/NewsSearchBar';
import Color from '../common/Color';

export const Search = () => {
     const { news, setNews, sections, areas, activeKey, setActiveKey  } = useOutletContext();
     const [ searched, setSearched ] = useState(false);
     const location = useLocation();
     const navigate = useNavigate();

     const restoreStatus = useCallback(async() => {
        if (activeKey !== 3) {
            setActiveKey(3);
        }
        if ( location.state?.searchParam ) {
            handleSearch(location.state.searchParam);
            setSearched(true)
        }
    },[activeKey,setActiveKey])

    useEffect(()=>{restoreStatus()},[activeKey,setActiveKey,restoreStatus]);

    const handleSearch = useCallback(async(params) => {
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
        navigate("", {state: { searchParam : params}} )
        setSearched(true);
    },[setNews])

    const BackToForm = () => {
        setSearched(false);
        navigate("", {state: null});
    }

    let renderIt = "";

    if (searched) {
        renderIt = <> 
                    <Guide>検索結果を表示しています…<span onClick={()=>BackToForm()}>条件を変える</span></Guide>
                    {news.length > 0 ?
                        news.map((n,index) => {
                            return <NewsCard key={index} news={n}/>
                        }) : <NoNews>表示する記事がありません。</NoNews>}
                  </>
        } else {
            renderIt = <NewsSearchBar sections={sections} areas={areas} handleSearch={handleSearch} />
        }

    return (
        <>
          {renderIt}
        </>
    )
}

const NoNews = styled.p`
  margin: 0 auto;
  color: #fff;
  font-size: 1rem;
  width: 100%;
  text-align: center;
  padding: 10px;
`

const Guide = styled.p`
    width: 80%;
    margin: 0 auto;
    text-align: center;
    background: ${Color.primary};
    color: white;
    padding: 3px;
    border-radius: 10px;
    span {
        text-decoration: underline;
        cursor: pointer;
        padding-left: 10px;
    }
`