import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext  } from '../../App';
import styled from 'styled-components'
import { ShowNews } from '../api/news';
import { DestroyNews } from '../api/news';
import { BackButton } from './common/BackButton';
import Color from './common/Color';

export const NewsInfo = () => {
    const [ news, setNews ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const newsId = useParams();
    const navigate = useNavigate();

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

    const handleDestroyNews = async(newsId) => {
        try {
            const res = await DestroyNews(newsId); 
            if (res.status === 200) {
                navigate("/news/index", { state:{ message: "Newsを削除しました。" }})
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
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
                    { currentUser.user.id === news.news.userId &&
                        <>
                            <Menu>
                                <ul>
                                    <li><Link to={`/news/${newsId.id}/edit`}
                                        state={{ title: news.news.title, content: news.news.content, to: news.to, from: news.from}}>編集</Link></li>
                                    <li><button onClick={()=>{handleDestroyNews(newsId.id)}}>削除</button></li>
                                </ul>
                            </Menu>
                            <ClearFix/>
                        </>
                    }
                    <h1>{news.news.title}</h1>
                    <p className="dayTime">{news.news.createdAt}</p>
                    <p>
                        <span className="toFrom">from</span>
                        {news.from.map((x,index) => {
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
                    <p>
                        <span className="toFrom">to</span>
                        {news.to.map((x,index) => {
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
        margin-bottom: 0;
        font-size: 1.1rem;
    }
    .dayTime {
        color:gray;
        margin: 0;
    }
    .toFrom {
        font-weight: bold;
        width: 40px;
        display: inline-block;
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
const Menu = styled.div`
    float: right; 
    ul {
        list-style: none;
        display:flex;
        li {
            padding: 10px;
        }
        margin-right: 10px;
    }
`

const ClearFix = styled.div`
    ::after {
        content: "";
        display: block;
        clear: both;
`