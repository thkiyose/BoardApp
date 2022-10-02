import React, { useState, useEffect } from 'react';
import Color from './common/Color';
import { Outlet, useOutletContext, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { fetchAllSectionsAreas  } from '../api/section';

export const NewsIndex = () => {
    const [ news, setNews ] = useState([]);
    const [ sections, setSections ] = useState([])
    const [ areas, setAreas ] = useState([])
    const currentUser = useOutletContext();
    const [ activeKey, setActiveKey ] = useState(0);
    const loadSections = async() => {
        try {
            const res = await fetchAllSectionsAreas(); 
            if (res.status === 200) {
                setSections(res.data.sections);
                setAreas(res.data.areas);
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    }
    useEffect(()=>{loadSections()},[setSections,setAreas]);

    return (
        <>
            <Tab activeKey={activeKey} setActiveKey={setActiveKey} />
            <Div>
                <Outlet context={{currentUser, news, setNews, sections, areas, activeKey, setActiveKey}}/>
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
    const { activeKey, setActiveKey } = props;
    const navigate = useNavigate();
    const onClick = (path,key) => {
        setActiveKey(key);
        navigate(path);
    }
    return (
        <TabDiv className="tabs">
            <label className={activeKey === 0 ? "active" : "" } onClick={()=>onClick("all",0)}>全て</label>
            <label className={activeKey === 1 ? "active" : "" } onClick={()=>onClick("to",1)}>To:自分の所属</label>
            <label className={activeKey === 2 ? "active" : "" } onClick={()=>onClick("from",2)}>From:自分の所属</label>
            <label className={activeKey === 3 ? "active" : "" } onClick={()=>onClick("search",3)}>検索</label>
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