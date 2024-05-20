import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #444343;
  padding: 2vh;
  padding-bottom: 3vh;
  margin-top: 3vh;

  & + & {
    margin-top: 3vh;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.img`
  border-radius: 70%;
  width: 15vw;
  height: 8vh;
  margin-right: 10px;
`;

const Date = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 2vh;
`;

const Name = styled.div`
  color: #bfb4b4;
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 20vh;
  object-fit: cover;
  padding-top: 2vh;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1vh;
  margin-top: 2vh;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.5vh 2vh;
  border: none;
  border-radius: 2vh;
  background-color: #c35050;
  color: white;
  font-size: 2vw;

  &:hover {
    background-color: #a33d3d;
  }
`;

const ReviewItem = ({ review, writer, loggedInUser, onReviewDelete }) => {
  //review.userid에 맞는 user의 닉네임,프로필 들고오기
  //userid에 해당하는 작성자 찾기
  const user = writer.find((user) => user.id === review.userid);

  const [deleted, setDeleted] = useState(false); // 삭제 여부 상태

  //리뷰 삭제
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/RestrauntReview/${review.id}`)
      .then(() => {
        alert("리뷰가 삭제되었습니다.");
        // 리뷰 삭제 후 deleted 상태를 변경하여 리렌더링하고, 리다이렉션
        setDeleted(true);
        onReviewDelete(review.id); //리뷰 개수 업데이트
      })
      .catch((error) => {
        console.error("리뷰를 삭제하는데 실패하였습니다.", error);
      });
  };

  // 삭제 후 deleted 상태가 true이면 null 반환하여 렌더링하지 않음
  if (deleted) {
    return null;
  }

  return (
    <Container>
      <User>
        <div>{user && <Profile src={user.profile} alt="" />}</div>
        <Name>
          {"@"}
          {user && user.nickname}
        </Name>
      </User>
      <Date>{review.date}</Date>
      <div>{review.content}</div>
      {review.image && <ReviewImage src={review.image} alt="" />}
      {loggedInUser && loggedInUser.id === review.userid && (
        <ButtonGroup>
          <Button>수정</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </ButtonGroup>
      )}
    </Container>
  );
};

export default ReviewItem;
