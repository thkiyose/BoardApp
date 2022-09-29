import React from 'react';
import { NewsForm } from './common/NewsForm';
import { BackButton } from './common/BackButton';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'

export const NewsEdit = () => {
    const newsId = useParams();
    
    return (
        <Div>
            <BackButton/>
            <NewsForm />
        </Div>
    )
}

const Div = styled.div`
    width: 60%;
    margin: 0 auto;
`