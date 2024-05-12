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

const ReviewItem = ({ review, writer }) => {
  //review.userid에 맞는 user의 닉네임,프로필 들고오기
  //userid에 해당하는 작성자 찾기
  const user = writer.find((user) => user.id === review.userid);

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
    </Container>
  );
};

export default ReviewItem;
