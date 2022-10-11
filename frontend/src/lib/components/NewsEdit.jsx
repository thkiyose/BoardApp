import React, { useState, useEffect } from 'react';
import { NewsForm } from './common/NewsForm';
import { BackButton } from './common/BackButton';
import { useLocation } from "react-router-dom";
import styled from 'styled-components'

export const NewsEdit = () => {
    const location = useLocation();
    const { id, title, content, to, from, toUsers, fromUsers } = location.state
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
            <NewsForm initialTitle={title} initialContent={content} newsId={id} update={true} initialTo={initialTo} initialFrom={initialFrom} initialToUsers={toUsers} initialFromUsers={fromUsers} />
        </Div>
    )
}

const Div = styled.div`
    width: 80%;
    margin: 0 auto;
`