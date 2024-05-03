import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Styledsubmitbutton = styled.button`
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

const Logintext = styled.div`
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

const TextE = styled.div`
  margin: 10% 90% 5% 2%;
  font-family: Inter;
  font-size: 6vw;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`;

const TextP = styled.div`
  margin: 10% 90% 5% 2%;
  font-family: Inter;
  font-size: 6vw;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`;

const EmailForm = styled.input`
  box-sizing: border-box;
  width: 95%;
  height: 40px;
  left: 33px;
  top: 360px;
  background: #fffdfd;
  border: 1px solid #000000;
  font-size: 6vw;

  //데스크탑
  @media (min-width: 992px) {
    height: 100px;
  }
`;

const PsForm = styled.input`
  box-sizing: border-box;
  width: 95%;
  height: 40px;
  left: 33px;
  top: 360px;
  background: #fffdfd;
  border: 1px solid #000000;
  font-size: 6vw;

  //데스크탑
  @media (min-width: 992px) {
    height: 100px;
  }
`;

const EmailError = styled.div`
  width: 100%;
  margin-top: 2%;
  font-family: "Inter";
  font-style: italic;
  font-weight: 700;
  font-size: 4vw;
  line-height: 130%;
  color: #ea0909;
`;

const PsError = styled.div`
  width: 100%;
  margin-top: 2%;
  font-family: "Inter";
  font-style: italic;
  font-weight: 700;
  font-size: 4vw;
  line-height: 130%;
  color: #ea0909;
`;

function Login() {
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
        } else {
          alert("login failure");
        }
      })
      .catch((error) => {
        alert("login failure");
      });
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
        <Logintext>LOGIN</Logintext>

        <div>
          <TextE>EMAIL</TextE>
          <div>
            <EmailForm
              type="text"
              className="input"
              placeholder="test@gmail.com"
              value={email}
              onChange={handleEmail}
            />
          </div>

          <EmailError>
            {!emailValid && email.length > 0 && (
              <div>Please enter a valid e-mail </div>
            )}
          </EmailError>

          <TextP>PASSWORD</TextP>
          <div>
            <PsForm
              type="password"
              className="input"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <PsError>
            {!pwValid && password.length > 0 && (
              <div>
                {" "}
                Please enter at least 8 characters including English and
                numbers.{" "}
              </div>
            )}
          </PsError>
        </div>

        <div>
          <Styledsubmitbutton
            onClick={() => {
              handleConfirmButton();
            }}
          >
            SUBMIT
          </Styledsubmitbutton>
        </div>
      </div>
    </Wrapper>
  );
}

export default Login;
