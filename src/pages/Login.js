import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../Context/AuthContext";
import Modal from "../component/Modal";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  .LoginText {
    font-size: 7vh;
    font-weight: bold;
    text-align: center;
    color: #c35050;
  }
`;

const Email = styled.div`
  .text {
    display: left;
    font-size: 4vh;
  }

  .LInput {
    font-size: 3vh;
    width: 90vw;
    border-radius: 1vh;
    outline: none;
    padding-left: 10px;
  }

  .Error {
    color: red;
    margin-top: 0.5vh;
    font-size: 2.5vh;
    width: 90%;
  }
`;

const Password = styled.div`
  .text {
    display: left;
    font-size: 4vh;
  }

  .PInput {
    font-size: 3vh;
    width: 90vw;
    border-radius: 1vh;
    outline: none;
    padding-left: 10px;
  }

  .Error {
    color: red;
    margin-top: 0.5vh;
    font-size: 2vh;
    font-size: 2.5vh;
    width: 90%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10vh;

  .submit {
    border-radius: 2vh;
    background-color: #ffffff;
    margin-right: 3vh;
    padding: 1vh 3vh;
    font-size: 3vh;
  }

  .submit:hover {
    background-color: #c35050;
  }

  .signup {
    border-radius: 2vh;
    background-color: #ffffff;
    margin-right: 3vh;
    padding: 1vh 3vh;
    font-size: 3vh;
  }

  .signup:hover {
    background-color: #c35050;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [open, setOpen] = useState(false); //모달창

  //이메일 유효성 검사
  const handleEmail = (e) => {
    setEmail(e.target.value);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  //axios를 이용해 버튼 클릭시 데이터 전송
  const handleConfirmButton = () => {
    axios
      .get("http://localhost:8080/Users", {
        params: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data[0];
          //로그인 정보 localStorage에 저장
          localStorage.setItem("user", JSON.stringify(user));
          //로그인 성공시 로그인 상태 디스패치
          login();
          setOpen(true);
          navigate("/main");
        } else {
          alert("login failure");
        }
      })
      .catch((error) => {
        alert("login failure", error);
      });
  };

  //회원가입 페이지로 이동
  const gotoSignup = () => {
    navigate("signup");
  };

  //비밀번호 유효성 검사
  const handlePassword = (e) => {
    setPassword(e.target.value);

    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

    if (regex.test(password)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  return (
    <div>
      <Wrapper>
        <div>
          <div className="LoginText">LOGIN</div>{" "}
          {/* Changed from <p> to <div> */}
          <Email>
            <div className="text">EMAIL</div> {/* Changed from <p> to <div> */}
            <input
              className="LInput"
              type="text"
              placeholder="test@gmail.com"
              value={email}
              onChange={handleEmail}
            />
            {!emailValid && email.length > 0 && (
              <div className="Error">Please enter a valid e-mail</div>
            )}
          </Email>
          <Password>
            <div className="text">PASSWORD</div>{" "}
            {/* Changed from <p> to <div> */}
            <input
              className="PInput"
              type="password"
              value={password}
              onChange={handlePassword}
            />
            {!pwValid && password.length > 0 && (
              <div className="Error">
                Please enter at least 8 characters including English and
                numbers.
              </div>
            )}
          </Password>
          <ButtonGroup>
            <button className="submit" onClick={handleConfirmButton}>
              SUBMIT
            </button>
            <button className="signup" onClick={gotoSignup}>
              SIGNUP
            </button>
          </ButtonGroup>
        </div>
      </Wrapper>
      <div>
        {open && setTimeout(() => <Modal content="login Success" />, 3000)};
      </div>
    </div>
  );
};

export default Login;
