import styled from "styled-components";

const StyledModal = styled.div`
  position: absolute;
  top: 50%;

  width: 30vw;
  height: 30vh;

  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

const Modal = (props) => {
  return <StyledModal> {props.content}</StyledModal>;
};

export default Modal;
