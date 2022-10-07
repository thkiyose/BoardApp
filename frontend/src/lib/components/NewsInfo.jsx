import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext  } from '../../App';
import styled from 'styled-components'
import { ShowNews } from '../api/news';
import { DestroyNews } from '../api/news';
import { BackButton } from './common/BackButton';
import Color from './common/Color';
import { Modal } from './common/Modal'
import { Archive } from '../api/news'

export const NewsInfo = () => {
    const [ news, setNews ] = useState({});
    const [ visitors, setVisitors ] = useState([]);
    const [ count, setCount ] = useState();
    const [ showVisitors, setShowVisitors ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const newsId = useParams();
    const navigate = useNavigate();

    const FetchNews = async(newsId,userId,admin) => {
        try {
            const res = await ShowNews(newsId,userId,admin); 
            if (res.status === 200) {
                setVisitors(res.data.visitors)
                setCount(res.data.count)
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
                navigate("/news/index/all", { state:{ message: "Newsを削除しました。" }})
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    }

    const handleArchive = async(newsId) => {
        const result = window.confirm("記事をアーカイブしますか？\n他のユーザーから見えなくなり、アーカイブリストでのみ確認出来るようになります。")
        if (result) {
            const res = await Archive(newsId)
            if (res.status === 200) {
                navigate("/news/index/all")
            } else {
                console.log(res)
            }
        }
    }

    useEffect(()=>{FetchNews(newsId.id, currentUser.user.id, currentUser.user.admin)},[newsId.id, currentUser.user.id, currentUser.user.admin]);

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
                                    <li><Link to={`/news/edit`} state={{ id: news.news.id, title: news.news.title, content: news.news.content, to: news.to, from: news.from}}>編集</Link></li>
                                    <li><button onClick={()=>{handleDestroyNews(newsId.id)}}>削除</button></li>
                                    <li><button onClick={()=>{handleArchive(newsId.id)}}>アーカイブ</button></li>
                                </ul>
                            </Menu>
                            <ClearFix/>
                        </>
                    }
                    <h1>{news.news.title}</h1>
                    <span className="dayTime">{news.news.createdAt}</span>
                    <span className="visitorCount">{count}人が閲覧しました</span>{visitors && <VisitorButton onClick={()=>{setShowVisitors(true)}}>詳細</VisitorButton>}
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
                    <Modal showFlag={showVisitors} setShowModal={setShowVisitors}>
                        <VisitorTitle>閲覧済みのユーザー</VisitorTitle>
                        <VisitorDiv>
                            {visitors.map((visitor)=>{
                                return (
                                    <Visitor>
                                        <p>{visitor.name}</p>
                                        <p>{visitor.email}</p>
                                    </Visitor>
                                )
                            })}
                        </VisitorDiv>
                    </Modal>
                </Div>
        )
    }
}

const Div = styled.div`
    padding: 20px 30px;
    background: white;
    width: 70%;
    font-size: 0.8rem;
    min-height: 100px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    h1 {
        margin-bottom: 0;
        font-size: 1.1rem;
    }
    .dayTime {
        color:gray;
        margin: 0;
    }
    .visitorCount {
        margin-left: 20px;
        background: ${Color.form};
        padding: 3px;
        border-radius: 5px;
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
    height: 20px;
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

const VisitorButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
`
const VisitorTitle = styled.h3`
    font-weight: normal;
    text-align: center;
`

const VisitorDiv = styled.div`
    align-item: strech;
    display: flex;
`
const Visitor = styled.div`
    margin: 5px;
    background: #fff;
    border: solid 2px ${Color.primary};
    padding: 4px;
    border-radius: 5px;
    p {
        margin: 0;
    }
`