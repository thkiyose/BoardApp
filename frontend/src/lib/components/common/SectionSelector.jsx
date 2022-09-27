import React from 'react'
import styled from "styled-components";

export const SectionSelector = (props) => {
    const {sections, selectedSection, setSelectedSection, selectedArea, setSelectedArea} = props;

    const handleSelectSection = (e) => {
        if (selectedSection.includes(e.target.value)) {
            setSelectedSection(selectedSection.filter((item)=> item !== e.target.value));
        } else {
            setSelectedSection([...selectedSection,e.target.value]);
        }
    }

    const handleSelectArea = (e) => {
        if (selectedArea.includes(e.target.value)) {
            setSelectedArea(selectedArea.filter((item)=> item !== e.target.value));
        } else {
            setSelectedArea([...selectedArea,e.target.value]);
        }
    }

    return (
        <>
            <SectionDiv>
            <p><label>所属セクション</label></p>
            {Object.keys(sections).map((key,value) => {
            return <React.Fragment key={key}><label><input onChange={(e)=>handleSelectSection(e)} type="checkbox" value={key} name={key}/><span>{key}</span></label></React.Fragment>
            })}
            </SectionDiv>
            { selectedSection.length > 0 && <p><label>所属エリア</label></p>}
            { selectedSection.map((secName) => {
                return (
                    <AreaDiv key={secName}>
                    <table>
                        <tbody>
                            <tr>
                                <th>{secName}</th>
                                <td>
                            {sections[secName].map((sec,index)=> {
                                    return (
                                        <React.Fragment key={index}>
                                        <label><input onChange={(e)=>{handleSelectArea(e)}} type="checkbox" value={[secName, sec.areas]} /><span>{sec.areas}</span></label>
                                        </React.Fragment>
                                       )                            
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </AreaDiv>
                );
            })
           }
           </>
    );
}

const SectionDiv = styled.div`
    border-top: solid 1px gray;
    margin-top: 20px;
    margin-bottom: 10px;
    label {
        margin-right: 5px;
        padding-bottom: 10px;
    }
    label input {
        display: none;

    }
    label span {
        color: #333;
        font-size: 0.8rem;
        border: 1px solid black;
        border-radius: 20px;
        padding: 6px;
        cursor: pointer;
    }
    label input:checked + span {
        color: #FFF;
        background: #00CC33;
        border: 1px solid #00CC33;
    }
`
const AreaDiv = styled.div`
    padding: 10px 0px 6px 0px;
    font-size: 0.8rem;
    table {
        width: 100%;
    }
    th {
        width: 20%;
        text-align: left;
    }
    label {
        margin-right: 5px;
        padding-bottom: 10px;
    }
    label input {
        display: none;

    }
    label span {
        color: #333;
        border: 1px solid black;
        border-radius: 20px;
        padding: 6px;
        cursor: pointer;
    }
    label input:checked + span {
        color: #FFF;
        background: #FF6633;
        border: 1px solid #FF6633;
    }
`