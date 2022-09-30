import React from 'react';
import { NewsForm } from './common/NewsForm';
import { BackButton } from './common/BackButton';
import styled from 'styled-components'

export const CreateNews = () => {
    return (
        <Div>
            <BackButton/>
            <NewsForm />
        </Div>
    )
}

const Div = styled.div`
    float: left;
    width: 70%;
    margin-left: 50px;
`