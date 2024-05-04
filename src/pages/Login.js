import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

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
          alert(`login Success`);
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
    <Wrapper>
      <div>
        <p className="LoginText">LOGIN</p>

        <Email>
          <p className="text">EMAIL</p>
          <input
            className="LInput"
            type="text"
            placeholder="test@gmail.com"
            value={email}
            onChange={handleEmail}
          />
          <p className="Error">
            {!emailValid && email.length > 0 && (
              <div>Please enter a valid e-mail </div>
            )}
          </p>
        </Email>

        <Password>
          <p className="text">PASSWORD</p>
          <input
            className="PInput"
            type="password"
            value={password}
            onChange={handlePassword}
          />
          <p className="Error">
            {!pwValid && password.length > 0 && (
              <div>
                Please enter at least 8 characters including English and
                numbers.
              </div>
            )}
          </p>
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
  );
};

export default Login;
