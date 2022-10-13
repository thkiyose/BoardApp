import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext  } from '../../App';
import styled from 'styled-components'
import { ShowNews } from '../api/news';
import { DestroyNews } from '../api/news';
import { BackButton } from './common/BackButton';
import moment from 'moment';
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
            if ( res.data.news.isArchived && userId !== res.data.news.userId ) {
                navigate("/")
                return;
            }
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
        const result = window.confirm("この記事を削除しますか？")
        if ( result === false ) {
            return;
        }
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
                navigate("/news/index/all", { state: { message: "Newsをアーカイブしました。"}})
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
                                    <li><Link to={`/news/edit`} state={{ id: news.news.id, title: news.news.title, content: news.news.content, to: news.toSec, from: news.fromSec, toUsers: news.toUsers, fromUsers: news.fromUsers}}>編集</Link></li>
                                    <li><button onClick={()=>{handleDestroyNews(newsId.id)}}>削除</button></li>
                                    <li><button onClick={()=>{handleArchive(newsId.id)}}>アーカイブ</button></li>
                                </ul>
                            </Menu>
                            <ClearFix/>
                        </>
                    }
                    <h1>{news.news.title}</h1>
                    <span className="dayTime">{(moment(news.news.createdAt).format("YYYY年MM月DD日 HH時mm分"))}</span>
                    <span className="visitorCount">{count}人が閲覧しました</span>{visitors && <VisitorButton onClick={()=>{setShowVisitors(true)}}>詳細</VisitorButton>}
                    <div>
                        <span className="toFrom">from</span>
                        {news.fromSec.map((x,index) => {
                            const children = [];
                                x.forEach((child,index) => {
                                   children.push(<span className="area" key={index}>{child.areas}</span>);
                                })
                            const span = React.createElement("span",{key: index},<SectionArea>{x[0].sections}:{[...children]}</SectionArea>)
                            return span;
                        })}
                        {news.fromUsers.map((user,index)=>{
                            return <User key={index}>{user.name}&lt;{user.email}&gt;</User>
                        })}
                    </div>
                    <p>
                        <span className="toFrom">to</span>
                        {news.toSec.map((x,index) => {
                            const children = [];
                                x.forEach((child,index) => {
                                   children.push(<span className="area" key={index}>{child.areas}</span>);
                                })
                            const span = React.createElement("span",{key: index},<SectionArea>{x[0].sections}:{[...children]}</SectionArea>)
                            return span;
                        })}
                        {news.toUsers.map((user,index)=>{
                            return <User key={index}>{user.name}&lt;{user.email}&gt;</User>
                        })}
                    </p>
                    <p>{content}</p>
                    <Modal showFlag={showVisitors} setShowModal={setShowVisitors}>
                        <VisitorTitle>閲覧済みのユーザー</VisitorTitle>
                        <VisitorDiv>
                            {visitors && visitors.map((visitor,index)=>{
                                return (
                                    <Visitor key={index}>
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
        color: gray;
        display: inline-block;
        padding: 10px 0px;
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
        margin-right: 10px;
    }
    li {
        margin: 2px;
    }
    li a {
        text-decoration: none;
        display: block;
        padding: 5px;
        background: ${Color.primary};
        color: #fff;
        text-align: center;
        width: 80px;
        :hover {
            background: ${Color.secondary};
        }
    }
    li button {
        border: none;
        background: ${Color.primary};
        color: #fff;
        cursor: pointer;
        width: 80px;
        padding: 5px;
        :hover {
            background: ${Color.secondary};
        }
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

const User = styled.span`
    background: ${Color.primary};
    color: white;
    padding: 3px;
    margin-left: 5px;
    border-radius: 5px;
    display: inline-block;
`