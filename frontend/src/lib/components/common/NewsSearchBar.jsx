import React, { useState } from 'react';
import Color from './Color';
import styled from 'styled-components'

export const NewsSearchBar = (props) => {
    const [ searchParam, setSearchParam ] = useState({
        title:"",
        content: "",
        fromSection: "",
        fromArea: "",
        toSection: "",
        toArea: "",
        date:["",""]
      });
      const { sections, areas, handleSearch } = props;

      const onChange = (param,type) => {
        if (type === "title"){
          setSearchParam({...searchParam,title:param})
        } else if (type === "content") {
          setSearchParam({...searchParam,content:param})
        } else if (type === "fromSection") {
          setSearchParam({...searchParam,fromSection:param})
        } else if (type === "fromArea") {
          setSearchParam({...searchParam,fromArea:param})
        } else if (type === "toSection") {
          setSearchParam({...searchParam,toSection:param})
        } else if ( type === "toArea") {
            setSearchParam({...searchParam,toArea:param})
        }else if (type === "start") {
          setSearchParam({...searchParam,date:[param, searchParam.date[1]]})
        } else if (type === "end") {
          setSearchParam({...searchParam,date:[searchParam.date[0],param]})
        }
      }

    return (
        <SearchBar>
            <table>
                <tbody>
                    <tr><th></th><td><label>タイトル</label><input onChange={(e)=>{onChange(e.target.value,"title")}} className="title"></input></td></tr>
                    <tr><th></th><td><label>本文</label><input onChange={(e)=>{onChange(e.target.value,"content")}} className="content"></input></td></tr>
                   <tr><th><span>作成日:</span></th><td><label>以降</label><input onChange={(e)=>{onChange(e.target.value,"start")}} type="date" className="date"></input><label>以前</label><input type="date" className="date" onChange={(e)=>{onChange(e.target.value,"end")}}></input></td></tr>
                   <tr><th><span>To:</span></th><td>
                    <label>セクション</label>
                   <select className="section" onChange={(e)=>{onChange(e.target.value,"toSection")}}>
                       <option hidden></option>
                        {Object.keys(sections).map((section,index)=> {
                            return  <option key={index}>{section}</option>
                        })}
                    </select>
                    <label>エリア</label>
                    <select className="area" onChange={(e)=>{onChange(e.target.value,"toArea")}}>
                        <option hidden></option>
                        {Object.keys(areas).map((area, index)=> {
                            return  <option value={area} key={index}>{area.toUpperCase()}</option>
                        })}
                    </select></td></tr>
                   <tr>
                    <th><span>From:</span></th><td>
                        <label>セクション</label>
                    <select className="section" onChange={(e)=>{onChange(e.target.value,"fromSection")}}>
                        <option hidden></option>
                            {Object.keys(sections).map((section,index)=> {
                                return  <option key={index}>{section}</option>
                            })}
                        </select>
                        <label>エリア</label>
                        <select className="area" onChange={(e)=>{onChange(e.target.value,"fromArea")}}>
                            <option hidden></option>
                            {Object.keys(areas).map((area, index)=> {
                                return  <option value={area} key={index}>{area.toUpperCase()}</option>
                            })}
                        </select></td>
                   </tr>
                </tbody>
            </table>
            <button className="searchButton" onClick={()=>{handleSearch(searchParam)}}>検索</button>
        </SearchBar>
    )
}

const SearchBar = styled.div`
    width: 90%;
    margin: 0 auto;
    color: white;
    table {
        width: 100%;
    }

    th {
        width: 10%;
    }
    td {
        width: 90%;
    }
    span {
        margin-right: 10px;
    }
    label {
        padding: 7px;
        background: ${Color.primary}
    }
    input, select {
        padding: 5px;
        line-height: 10px;
        border: none;
        margin: 5px;
    }
    .title {
        width: 30%;
    }
    .content {
        width: 80%;
    }
    .date {
        width: 30%;
    }
    .section {
        width: 30%;
    }
    .area {
        width: 30%;
    }
    .searchButton {
        width: 50%;
        margin: 0 auto;
        background-color: navy;
        color: white;
        border: none;
        display: block;
        padding: 10px;
        cursor: pointer;
    }
`