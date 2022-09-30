import React, { useState, useEffect, useContext } from 'react';
import Color from './common/Color';
import styled from 'styled-components'
import { AuthContext  } from '../../App';

export const NewsSearchBar = () => {
    const [ textQuery, setTextQuery ] = useState("");
    const [ fromQuery, setFromQuery ] = useState({section: "", area: ""});
    const [ toQuery, setToQuery  ] = useState({section: "", area: ""});
    const [ date, setDate ] = useState({start:"", end: ""})
}