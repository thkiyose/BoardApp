import React, { useState, useEffect, useCallback, useContext } from 'react';
import Color from './common/Color';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { AuthContext } from '../../App';
import { fetchAllSectionsAreas  } from '../api/section';

export const NewsHistory = () => {
    const [ news, setNews ] = useState([]);
    const { currentUser } = useContext(AuthContext);

    const loadSections = async() => {
        try {
            const res = await fetchAllSectionsAreas(); 
            if (res.status === 200) {
            } else {
              console.log(res)
            }
          } catch (e) {
            console.log(e)
          }
    }
    useEffect(()=>{loadSections()},[]);

    return (
        <>
            <Div>
                test
            </Div>
        </>
    )
}

const Div = styled.div`
    padding: 20px;
    margin: 0 auto;
    width: 90%;
`