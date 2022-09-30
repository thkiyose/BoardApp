import React, { useState, useEffect } from 'react';
import { NewsForm } from './common/NewsForm';
import { BackButton } from './common/BackButton';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import styled from 'styled-components'

export const NewsEdit = () => {
    const newsId = useParams();
    const location = useLocation();
    const { title, content, to, from } = location.state
    const [ initialTo, setInitialTo ] = useState([]);
    const [ initialFrom, setInitialFrom ] = useState([]);

    const convertArray = (to,from) => {
        const toArr = []
        const fromArr = []
        to.map((x)=> {
            return (
                x.forEach((child) =>{
                    toArr.push({section: child.sections, area: child.areas})
                } )
            )
        })
        setInitialTo(toArr);
        from.map((x)=> {
            return (
                x.forEach((child) =>{
                    fromArr.push({section: child.sections, area: child.areas})
                } )
            )
        })
        setInitialFrom(fromArr);
    }
    useEffect(()=>{convertArray(to,from)},[to,from])

    return (
        <Div>
            <BackButton/>
            <NewsForm initialTitle={title} initialContent={content} newsId={newsId.id} update={true} initialTo={initialTo} initialFrom={initialFrom} />
        </Div>
    )
}

const Div = styled.div`
    float: left;
    width: 70%;
    margin-left: 50px;
`