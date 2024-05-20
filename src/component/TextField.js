import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import PhotoField from "./PhotoField";

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
  font-size: 3vh;
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
  const navigate = useNavigate();

  const { id } = useParams();
  //현재 로그인한 사용자 닉네임 가져오고 프로필 사진이 있는 경우 가져오기
  //로컬 스토리지에 저장된 user 데이터 읽기
  const user = JSON.parse(localStorage.getItem("user"));

  //PhotoField 컴포넌트에 접근할 useRef 생성
  const photoFieldRef = useRef();

  //리뷰 작성 POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //PhotoField 컴포넌트에 uploadImage 함수를 호출하여 완성 버튼을 눌렀을 때 이미지 같이 전송
      const imageUrl = await photoFieldRef.current.uploadImage();

      //서버에 이미지 URL과 함께 리뷰 데이터 전송
      const response = await axios.post(
        "http://localhost:8080/RestrauntReview",
        {
          content: content, //글 내용
          userid: user.id, //작성자
          resid: parseInt(id), //해당 식당의 id
          image: imageUrl, //base64 이미지 URL 전송
          date: new Date().toISOString(),
        }
      );
      console.log("리뷰 등록이 완료되었습니다.", response.data);
      alert("리뷰가 등록되었습니다!");
      navigate(`/main/menulist/${id}/reviewList`); //리뷰 리스트 페이지로 리다이렉션
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
      <PhotoField ref={photoFieldRef} />
    </div>
  );
};

export default TextField;
