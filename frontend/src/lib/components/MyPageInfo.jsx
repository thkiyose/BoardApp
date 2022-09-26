import React, { useContext } from 'react';
import { AuthContext } from '../../App.jsx';
import styled from 'styled-components'

export const MyPageInfo = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div>
            {currentUser.email}
        </div>
    )
}