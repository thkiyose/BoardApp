import React from 'react';
import styled from 'styled-components'

export const NewsCard = (props) => {
    const { news } = props;
    return (
        <div>
            <p>{news.title}</p>
            <p>{news.content}</p>
        </div>
    )
}