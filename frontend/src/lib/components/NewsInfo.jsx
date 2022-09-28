import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { ShowNews } from '../api/news';

export const NewsIndex = () => {
    const [ news, setNews ] = useState({});
    const [ to, setTo ] = useState([])
    const [ from, setFrom ] = useState([])
console.log(from)
    const ShowNews = async() => {
        try {
            const res = await ShowNews(); 
            if (res.status === 200) {
                setNews(res.data.news);
                setTo(res.data.to);
                setFrom(res.data.from);
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    }
    useEffect(()=>{ShowNews()},[setNews]);

    return (
        <Div>
        </Div>
    )
}

const Div = styled.div`
    padding: 0;
`