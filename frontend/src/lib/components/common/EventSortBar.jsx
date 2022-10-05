import React, { useState, useCallback } from 'react';
import { SortEvents  } from '../../api/event';
import Color from './Color';
import styled from 'styled-components'

export const EventSortBar = (props) => {
    const [ searchParam, setSearchParam ] = useState({
        title:"",
        section: "",
        area: "",
      });
      const { sections, areas, setEvents } = props;

      const onChange = (param,type) => {
        if (type === "title"){
          setSearchParam({...searchParam,title:param})
        } else if (type === "section") {
          setSearchParam({...searchParam,section:param})
        } else if (type === "area") {
          setSearchParam({...searchParam,area:param})
        }
      }

    const handleSort = useCallback(async(params) => {
        try {
            const res = await SortEvents(params); 
            if (res.status === 200) {
                setEvents(res.data.events);
            } else {
            console.log(res)
            }
        } catch (e) {
            console.log(e)
        }
    },[setEvents])

    return (
        <SortBar>
            <label>タイトル</label><input onChange={(e)=>{onChange(e.target.value,"title")}} className="title"></input>
            <label>セクション</label>
            <select className="section" onChange={(e)=>{onChange(e.target.value,"section")}}>
                <option hidden></option>
                {Object.keys(sections).map((section,index)=> {
                    return  <option key={index}>{section}</option>
                })}
            </select>
            <label>エリア</label>
            <select className="area" onChange={(e)=>{onChange(e.target.value,"area")}}>
                <option hidden></option>
                {Object.keys(areas).map((area, index)=> {
                    return  <option value={area} key={index}>{area.toUpperCase()}</option>
                })}
            </select>
            <button className="searchButton" onClick={()=>{handleSort(searchParam)}}>イベントを絞り込む</button>
        </SortBar>
    )
}

const SortBar = styled.p`
    color: black;
    width: 50%;
    background: ${Color.secondary};
    margin: 0;
    padding: 5px;
    select {
        padding: 2px;
    }
    .searchButton {
        margin-left: 10px;
        background-color: ${Color.primary};
        color: white;
        border: none;
        padding: 5px;
        cursor: pointer;
    }
`