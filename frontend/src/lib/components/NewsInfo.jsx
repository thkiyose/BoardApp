import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

export const NewsIndex = () => {
    const [ news, setNews ] = useState({});

    const LoadNews = async() => {
        try {
            const res = await IndexNews(); 
            if (res.status === 200) {
                setNews(res.data.news);
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    }
    useEffect(()=>{LoadNews()},[setNews]);

    return (
        <Div>
        </Div>
    )
}

const Div = styled.div`
    padding: 0;
`