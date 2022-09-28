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
    width: 60%;
    margin: 0 auto;
`