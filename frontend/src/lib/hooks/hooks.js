import { useState } from 'react';

export const useFlash = () => {
    const [ showFlag, setShowFlag ] = useState(false);
    const [ message, setMessage ] = useState("");

    const show = (msg) => { 
        setShowFlag(true);
        setMessage(msg) 
    }

    const hide = () => {
        setShowFlag(false);
        setMessage("") 
    }
    return [ showFlag, message, { show, hide }]
}