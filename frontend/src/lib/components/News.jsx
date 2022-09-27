import React, { useState } from 'react';
import { useLocation } from "react-router-dom"
import { FlashMessage } from './common/FlashMessage';

export const News = (props) => {
    const location = useLocation();
    const [ message ] = useState(location.state ?  [location.state.message] : []);
    
    return (<>
        <FlashMessage message={message} type={"success"} />
    </>)
}