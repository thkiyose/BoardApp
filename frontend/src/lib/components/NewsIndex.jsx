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
        renderIt = <NewsSearchBar sections={sections} areas={areas} handleSearch={handleSearch} setShowSearch={setShowSearch} />
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
    const [ activeKey, setActiveKey ] = useState("0")

    const userSectionParams = Object.values(currentUser.sections).map((x)=>{
        return (
                x.map((child)=>{
                    return (child.id)
                  })
                )
        }
    )

    const changeActive = (e) => {
        switch (e.target.id) {
            case "0":
                setActiveKey(e.target.id);
                props.loadNews();
                props.setShowSearch(false)
                break;
            case "1":
                setActiveKey(e.target.id);
                props.handleSearch({toIds: userSectionParams.flat()})
                props.setShowSearch(false)
                break;
            case "2":
                setActiveKey(e.target.id);
                props.handleSearch({fromIds: userSectionParams.flat()})
                props.setShowSearch(false)
                break;
            case "3":
                setActiveKey(e.target.id);
                props.setShowSearch(true);
                break;
            default:
        }

    }

    return (
        <TabDiv className="tabs">
            <label id="0" className={activeKey === "0" ? "active" : ""} onClick={(e)=>{changeActive(e)}}>全て</label>
            <label id="1" className={activeKey === "1" ? "active" : ""} onClick={(e)=>{changeActive(e)}}>To:自分の所属</label>
            <label id="2" className={activeKey === "2" ? "active" : ""} onClick={(e)=>{changeActive(e)}}>From:自分の所属</label>
            <label id="3" className={activeKey === "3" ? "active" : ""} onClick={(e)=>{changeActive(e)}}>検索</label>
        </TabDiv>
    )
}

const TabDiv = styled.div`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    label {
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
  .active {
    background: ${Color.secondary};
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
