import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import Color from './common/Color.jsx';
import styled from "styled-components";
import { AuthContext  } from '../../App.jsx';
import { Modal } from './common/Modal';

export const ShowEvent = (props) => {
    const {eventId, showModal, setShowModal} = props;

    return (
        <Modal showFlag={showModal} setShowModal={setShowModal}>
            <p>aaa</p>
        </Modal>
    )
}