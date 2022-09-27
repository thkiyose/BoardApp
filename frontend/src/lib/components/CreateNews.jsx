import React, { useState } from 'react';
import { useLocation } from "react-router-dom"
import { FlashMessage } from './common/FlashMessage';

export const CreateNews = (props) => {
    const location = useLocation();
    const [ message ] = useState([]);
    
    return (<>
        <FlashMessage message={message} type={"warning"} />
    </>)
}