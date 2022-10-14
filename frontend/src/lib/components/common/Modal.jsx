import React from "react";
import styled from "styled-components";
import Color from "./Color"


const ModalContent = styled.div`
    overflow: scroll;
    max-height: 500px;
    background: ${Color.bg};
    width: 50%;
    @media screen and (max-width: 425px) {
      width: 100%;
   }
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

export const Modal = (props) => {
  const { showFlag, setShowModal, resetState } = props;

  const handleCloseModal = () => {
    if (props.setIsEdit) {
      props.setIsEdit(false);
    }
    setShowModal(false);
    resetState && resetState("");
  };
  return (
    <>
      { showFlag && <>
        <OverLay onClick={()=>handleCloseModal()}>
        <ModalContent onClick={(e)=>e.stopPropagation()}>
            {props.children}
        </ModalContent>
      </OverLay>
      </>}
    </>
  );
};
