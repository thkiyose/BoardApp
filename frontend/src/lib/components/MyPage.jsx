import React, { useContext } from 'react';
import { AuthContext } from '../../App.jsx';

export const MyPage = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div>
        </div>
    )
}