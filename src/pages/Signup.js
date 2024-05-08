import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../component/Modal";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .text {
    font-size: 7vh;
    font-weight: bold;
    text-align: center;
    color: #c35050;
    margin-top: 4vh;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3vh;
`;

const Input = styled.input`
  font-size: 2.5vh;
  width: 100%;
  padding: 1vh;
  border-radius: 1vh;
  outline: none;
`;

const Text = styled.div`
  display: left;
  font-size: 4vh;
`;

const Error = styled.div`
  color: red;
  font-size: 2vh;
  margin-top: 0.5vh;
  width: 80%;
`;

const Button = styled.button`
  border-radius: 2vh;
  background-color: #ffffff;
  margin-right: 3vh;
  padding: 1vh 3vh;
  font-size: 3vh;
  margin-top: 10vh;

  &:hover {
    background-color: #c35050;
  }
`;

function Signup() {
  const navigate = useNavigate();

  //초기값 세팅
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [open, setOpen] = useState(false);

  //오류메시지 상태 저장
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  //유효성 상태 저장
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIspassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [notAllow, SetNotAllow] = useState(true); //초기상태 = 버튼 비활성화

  //이메일 유효성 검사
  const ValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return email.match(regex);
  };

  //비밀번호 유효성 검사
  const ValidPassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

    return password.match(regex);
  };

  //비밀번호 확인 유효성
  const ValidPasswordConfirm = (passwordConfirm) => {
    return password === passwordConfirm;
  };

  //이메일
  const handleEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);

    if (!ValidEmail(currentEmail)) {
      setEmailMessage("Email format is incorrect");
      setIsEmail(false);
    } else {
      setEmailMessage("Correct email format");
      setIsEmail(true);
    }
  };

  //비밀번호
  const handlePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);

    if (!ValidPassword(currentPassword)) {
      setPasswordMessage("8 digits including English and numerals");
      setIspassword(false);
    } else {
      setPasswordMessage("Secure Password");
      setIspassword(true);
    }
  };

  //비밀번호 확인
  const handlePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);

    if (!ValidPasswordConfirm(currentPasswordConfirm)) {
      setPasswordConfirmMessage("Password don't match");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("Password matches");
      setIsPasswordConfirm(true);
    }
  };

  //닉네임
  const handleNickname = (e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);
  };

  useEffect(() => {
    if (isEmail && isPassword && isPasswordConfirm) {
      SetNotAllow(false); //버튼 활성화
      return;
    }
    SetNotAllow(true);
  }, [isEmail, isPassword, isPasswordConfirm]);

  //axios를 이용해 버튼 클릭시 데이터 전송
  const handleSubmitbutton = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/Users", {
        email,
        password,
        nickname,
      });
      //alert("Signup success! Please Login");
      setOpen(true);
      navigate("/");
    } catch (error) {
      alert("Signup Error", error);
    }
  };

  return (
    <div>
      <Wrapper>
        <div className="text">Signup</div>

        <InputContainer>
          <Text>Email</Text>
          <Input
            value={email}
            onChange={handleEmail}
            placeholder="test@gmail.com"
            type="text"
          />
          <Error>{emailMessage}</Error>
        </InputContainer>

        <InputContainer>
          <Text>Password</Text>
          <Input value={password} onChange={handlePassword} type="password" />
          <Error>{passwordMessage}</Error>
        </InputContainer>

        <InputContainer>
          <Text>Password Confirm</Text>
          <Input
            value={passwordConfirm}
            onChange={handlePasswordConfirm}
            type="password"
          />
          <Error>{passwordConfirmMessage}</Error>
        </InputContainer>

        <InputContainer>
          <Text>Nickname</Text>
          <Input value={nickname} onChange={handleNickname} type="text" />
        </InputContainer>

        <Button onClick={handleSubmitbutton} disabled={notAllow}>
          Signup
        </Button>
      </Wrapper>
      <div>{open && <Modal content="Signup success! Please Login" />};</div>
    </div>
  );
}

export default Signup;
