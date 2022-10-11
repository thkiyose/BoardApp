import React, { useState, useEffect, useCallback } from 'react';
import moment from "moment";
import Color from './common/Color';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { UserArchiveList } from '../api/news';
import { DestroyNews } from '../api/news';
import { Archive } from '../api/news';

export const ArchiveList = () => {
    const [ news, setNews ] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const loadArchive = useCallback(async() => {
        try {
            const res = await UserArchiveList(location.state?.id); 
            if (res.status === 200) {
                setNews(res.data.news);
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    },[location.state?.id])

    useEffect(()=>{loadArchive()},[loadArchive]);

    const handleDestroyNews = async(newsId) => {
        const result = window.confirm("本当に削除しますか？")
        if (result) {
            const res = await DestroyNews(newsId)
            if (res.status === 200) {
                loadArchive()
                navigate("", { state: { id: location.state.id, message: "記事を削除しました。"}})
            } else {
                console.log(res)
            }
        }
    }

    const handleRestore = async(newsId) => {
        const result = window.confirm("記事を一般公開に戻しますか？")
        if (result) {
            const res = await Archive(newsId)
            if (res.status === 200) {
                loadArchive()
                navigate("", { state: { id: location.state.id, message: "記事を一般公開に戻しました。"}})
            } else {
                console.log(res)
            }
        }
    }

    if ( news.length > 0) {
        return (
            <>
                <Div>
                    <h1>アーカイブした記事</h1>
                    <Table>
                        <thead>
                            <tr><th>タイトル</th><th>投稿日時</th><th></th></tr>
                        </thead>
                        <tbody>
                            {news.map((n,index)=> {
                                return (
                                    <tr key={index}>
                                        <td className="title"><Link to={`../${n.id}`} >{n.title}</Link></td>
                                        <td className="createdAt">{moment(n.createdAt).format('YYYY MM/DD  HH:mm')}</td>
                                        <td className="menu"><button onClick={()=>handleDestroyNews(n.id)}>削除</button><button onClick={()=>{handleRestore(n.id)}}>復元</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Div>
            </>
        )
    } else if ( location.state === null ) {
        return <Error>ユーザー情報がありません。</Error>
    } else {
        return <Error>アーカイブしたNewsはありません</Error>
    }

}

const Div = styled.div`
    padding: 20px;
    margin: 0 auto;
    width: 80%;
    h1 {
        text-align: center;
        font-size: 1.2rem;
        font-weight: lighter;
    }
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    th {
        background: ${Color.secondary};
        font-weight: normal;
        padding: 4px;
    }
    td {
        padding: 4px;
    }
    tr:nth-child(2n) {
        background: #e0e0e0;
    }
    tr:hover {
        background: #c4c4c4;
    }
    td a {
        text-decoration: none;
        width: 100%;
        display: block;
    }
    .createdAt {
        width: 20%;
        text-align: center;
    }
    .menu {
        width: 20%;
        text-align: center;
    }
    button {
        padding: 1px;
        font-size: 0.8rem;
        margin: 0px 5px;
    }
`

const Error = styled.p`
    margin: 0 auto;
    text-align: center;
    padding: 50px;
`