import React from 'react';
import { useOutletContext } from "react-router-dom";

export const Calendar = (props) => {
    const [ setMessage ] = useOutletContext();

    return <p>
        test
    </p>
}