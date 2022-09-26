import React, { useContext } from 'react';
import { AuthContext } from '../../App.jsx';

const MyPage = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div>
            { currentUser.name }
        </div>
    )
}