import { useState } from 'react';

export const useFlash = () => {
    const [ showFlag, setShowFlag ] = useState(false);
    const [ message, setMessage ] = useState("");

    const Show = (msg) => { 
        setShowFlag(true);
        setMessage(msg) 
    }

    const Hide = () => {
        setShowFlag(false);
        setMessage("") 
    }
    return [ showFlag, message, { Show, Hide }]
}