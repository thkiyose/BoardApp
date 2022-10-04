import React from "react";
import styled from "styled-components";
import Color from "./Color"


const ModalContent = styled.div`
    background: ${Color.bg};
    width: 50%;
    padding: 20px;
    font-size: 0.8rem;
    h2 {
        text-align: center;
    }
    label {
        display: block;
        margin-left: 5%;
        margin-top: 20px;
    }
    input {
        margin-left: 5%;
        background: none;
        box-sizing: border-box;
        border: none;
        border-bottom: solid 1px gray;
        padding: 8px;
    }
    textarea {
        margin-left: 5%;
        background: none;
        box-sizing: border-box;
        border: none;
        border-bottom: solid 1px gray;
        padding: 8px;
    }
    input[type="checkBox"] {
        width: 20px;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .title,.description {
        width: 85%;
    }
    .description {
      min-height: 150px;
    }
    .date, .time {
        width: 40%;
    }
    .submit {
        display: block;
        background-color: ${Color.primary};
        color: white;
        border: none;
        margin: 0 auto;
        width: 50%;
        padding: 15px;
        cursor: pointer;
    }
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
    float: right;
    border: none;
    color: #fff;
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
