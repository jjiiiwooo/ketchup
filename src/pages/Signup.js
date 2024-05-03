import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const SignT = styled.div`
  text-align: center;
  font-family: Inter;
  font-size: 10vw;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`;

const EmailT = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 7vw;
  line-height: 42px;
`;

const EmailForm = styled.input`
  box-sizing: border-box;
  width: 95%;
  height: 40px;
  margin: 2vw 0 2vw 0;
  background: #fffdfd;
  border: 1px solid #000000;
  font-size: 6vw;
`;

const EmailError = styled.div`
  width: 100%;
  font-family: "Inter";
  font-style: italic;
  font-weight: 700;
  font-size: 4vw;
  line-height: 130%;
  color: #ea0909;
`;

const PsT = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 7vw;
  line-height: 42px;
`;

const PasswordForm = styled.input`
  box-sizing: border-box;
  width: 95%;
  height: 40px;
  margin: 2vw 0 2vw 0;
  background: #fffdfd;
  border: 1px solid #000000;
  font-size: 6vw;
`;

const PsError = styled.div`
  width: 100%;
  font-family: "Inter";
  font-style: italic;
  font-weight: 700;
  font-size: 4vw;
  line-height: 130%;
  color: #ea0909;
`;

const PsCT = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 7vw;
  line-height: 42px;
`;

const PscForm = styled.input`
  box-sizing: border-box;
  width: 95%;
  height: 40px;
  margin: 2vw 0 2vw 0;
  background: #fffdfd;
  border: 1px solid #000000;
  font-size: 6vw;
`;

const PscError = styled.div`
  width: 100%;
  font-family: "Inter";
  font-style: italic;
  font-weight: 700;
  font-size: 4vw;
  line-height: 130%;
  color: #ea0909;
`;

const NickT = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 7vw;
  line-height: 42px;
`;

const NickForm = styled.input`
  box-sizing: border-box;
  width: 95%;
  height: 40px;
  margin: 2vw 0 2vw 0;
  background: #fffdfd;
  border: 1px solid #000000;
  font-size: 6vw;
`;

const SubmitButton = styled.button`
  width: 70%;
  margin: 30% 10% 10% 10%;
  border-radius: 20px;
  background-color: #c5dbfc;
  font-family: Inter;
  font-size: 8vw;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`;

function Signup() {
  //초기값 세팅
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");

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
      alert("Signup success! Please Login");
    } catch (error) {
      alert("Signup Error", error);
    }
  };

  return (
    <Wrapper>
      <SignT>signup</SignT>

      <EmailT>EMAIL</EmailT>
      <EmailForm
        id="email"
        value={email}
        onChange={handleEmail}
        required={true}
        type="text"
      />

      <EmailError>{emailMessage}</EmailError>

      <PsT>PASSWORD</PsT>
      <PasswordForm
        id="password"
        value={password}
        onChange={handlePassword}
        required={true}
        type="password"
      />

      <PsError>{passwordMessage}</PsError>

      <PsCT>PASSWORDCONFIRM</PsCT>
      <PscForm
        id="passwordConfirm"
        value={passwordConfirm}
        onChange={handlePasswordConfirm}
        required={true}
        type="password"
      />

      <PscError>{passwordConfirmMessage}</PscError>

      <NickT>NICKNAME</NickT>
      <NickForm
        id="nickname"
        value={nickname}
        onChange={handleNickname}
        required={true}
        type="text"
      />
      <SubmitButton
        formMethod="post"
        onClick={handleSubmitbutton}
        disabled={notAllow}
      >
        Signup
      </SubmitButton>
    </Wrapper>
  );
}

export default Signup;
