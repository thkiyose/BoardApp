import React, { useState, useEffect, useContext } from 'react';
import Color from './common/Color';
import { NewsSearchBar } from './common/NewsSearchBar';
import styled from 'styled-components'
import { IndexNews } from '../api/news';
import { SearchNews } from '../api/news';
import { AuthContext  } from '../../App';
import { NewsCard } from './common/NewsCard';

export const NewsIndex = () => {
    const [ news, setNews ] = useState([]);
    const [ sections, setSections ] = useState([])
    const [ areas, setAreas ] = useState([])
    const [ showSearch, setShowSearch ] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const loadNews = async() => {
        try {
            const res = await IndexNews(); 
            if (res.status === 200) {
                setNews(res.data.news);
                setSections(res.data.sections)
                setAreas(res.data.areas)
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    }
    useEffect(()=>{loadNews()},[setNews,setSections]);

    const handleSearch = async(params) => {
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
    }

    var renderIt = null;

    if (showSearch) {
        renderIt = <NewsSearchBar sections={sections} areas={areas}/>
    } else if (news.length === 0) {
        renderIt = <NoNews>表示する記事がありません。</NoNews>
    } else {
        renderIt = news.map((n,index)=>{
            return (
                <NewsCard key={index} news={n}/>
            )
        })
        }

    return (
        <>
            <Tab loadNews={loadNews} handleSearch={handleSearch} currentUser={currentUser} setShowSearch={setShowSearch}/>
            <Div>
                {renderIt}
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

const Tab = (props) => {
    const { currentUser } = props;
    const userSectionParams = Object.values(currentUser.sections).map((x)=>{
        return (
                x.map((child)=>{
                    return (child.id)
                  })
                )
        }
    )

    return (
        <TabDiv className="tabs">
            <label className="tab_item" onClick={()=>props.loadNews() && props.setShowSearch(false)}>全て</label>
            <label className="tab_item" onClick={()=>{props.handleSearch({toIds: userSectionParams.flat()}) && props.setShowSearch(false)}}>To:自分の所属</label>
            <label className="tab_item" onClick={()=>{props.handleSearch({fromIds: userSectionParams.flat()}) && props.setShowSearch(false)}}>From:自分の所属</label>
            <label className="tab_item" onClick={()=>props.setShowSearch(true)}>検索</label>
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

const NoNews = styled.p`
  margin: 0 auto;
  color: #fff;
  font-size: 1rem;
`
