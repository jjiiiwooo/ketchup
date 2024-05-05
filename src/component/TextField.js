import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const ContentBox = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin-top: 4vh;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .profile {
    border-radius: 70%;
    width: 15vw;
    height: 10vh;
  }

  .name {
    color: gray;
    font-weight: bold;
  }
`;

const StyledInput = styled.input`
  height: 10vh;
  width: 95%;
  margin-top: 3vh;
  padding: 8px;
  border: none;
  font-size: 16px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  .cancle {
    order: 1;
    font-size: 3vh;
    border: none;
    background-color: transparent;
    color: #c35050;
    font-weight: bold;
  }

  .complete {
    order: 2;
    font-size: 3vh;
    border-radius: 5vw;
    border: none;
    background-color: #c35050;
    color: white;
  }
`;

const TextField = () => {
  const [content, setContent] = useState(""); //리뷰 내용

  const { Food_id } = useParams();
  //현재 로그인한 사용자 닉네임 가져오고 프로필 사진이 있는 경우 가져오기
  //로컬 스토리지에 저장된 user 데이터 읽기
  const user = JSON.parse(localStorage.getItem("user"));

  //리뷰 작성 POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/MenuReview", {
        content: content, //글 내용
        userid: user.id, //작성자
        menuid: parseInt(Food_id), //해당 메뉴의 Food_id
      });
      console.log("리뷰 등록이 완료되었습니다.", response.data);
      setContent("");
    } catch (error) {
      console.error("리뷰 게시 중 오류가 발생하였습니다.:", error);
    }
  };

  return (
    <div>
      <ButtonGroup>
        <button className="cancle">취소</button>
        <button className="complete" onClick={handleSubmit}>
          완료
        </button>
      </ButtonGroup>
      <ContentBox>
        <User>
          {user && user.profile && (
            <img className="profile" src={user.profile} alt="User Profile" />
          )}
          {user && <div className="name">@{user.nickname}</div>}
        </User>
        <form>
          <StyledInput
            placeholder="리뷰를 작성해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></StyledInput>
        </form>
      </ContentBox>
    </div>
  );
};

export default TextField;
