import React from "react";
import styled from "styled-components";
import Color from "./Color"


const ModalContent = styled.div`
    overflow: scroll;
    max-height: 500px;
    background: ${Color.bg};
    width: 50%;
    padding: 20px;
    position: relative;
    font-size: 0.8rem;
`

const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
const CloseButton = styled.button`
    background-color: ${Color.primary};
    font-size: 1.3rem;
    border: none;
    color: #fff;
    position: fixed;
    left: 73%;
    cursor: pointer;
    marign-left:500px;
`

export const Modal = (props) => {
  const { showFlag, setShowModal } = props;

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      { showFlag && <>
        <OverLay>
        <ModalContent>
          <CloseButton onClick={()=>{handleCloseModal()}}>✕</CloseButton>
            {props.children}
        </ModalContent>
      </OverLay>
      </>}
    </>
  );
};
