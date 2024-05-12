import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaLocationDot } from "react-icons/fa6";
import Star from "./Star";

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 4vh;
  padding-bottom: 2vh;
`;
const Image = styled.img`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 36vh;
  margin-top: 2vh;
  border-radius: 10%;
`;

const Container = styled.div`
  position: absolute;
  background-color: white;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -90%);
  border: 1px solid black;
  width: 80%;
  padding: 2vw;
  padding-bottom: 6vh;

  .id {
    display: none; //id 숨기기
  }
  .name {
    text-align: center;
    font-weight: bold;
    font-size: 6vw;
  }

  .star {
    text-align: center;
    margin-left: 25vw;
    margin-bottom: 5vw;
  }

  .location {
    text-align: center;
  }
`;

const ReviewButton = styled.button`
  background-color: transparent;
  position: absolute;
  bottom: -4vh;
  right: -2vw;
  margin: 10vw;
  padding: 1vw 1vw;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 4vw;
  color: #c35050;
`;

const ResInfo = () => {
  const { id } = useParams(); //useParams로 파라미터 가져오기
  const Location = useLocation(); //useLocation() 호출, location 객체 반환
  const navigate = useNavigate();

  //search 부분을 URLSearchParams 객체로 생성
  const params = new URLSearchParams(Location.search);

  //쿼리 가져오기
  const name = params.get("name");
  const img = params.get("img");
  const star = params.get("star");
  const location = params.get("location");

  //리뷰리스트 페이지 이동시 id 데이터도 함께 전달
  const gotoReviewList = () => {
    navigate(`/main/menulist/${id}/reviewList`);
  };

  return (
    <div>
      <Wrapper>
        <Image img src={img} alt={name} />
        <Container>
          <p className="id">{id}</p>
          <p className="name">{name}</p>
          <p className="star">
            <Star star={star} />
          </p>
          <p className="location">
            <FaLocationDot />
            {location}
          </p>
          <ReviewButton onClick={gotoReviewList}>Review{">"}</ReviewButton>
        </Container>
      </Wrapper>
    </div>
  );
};

export default ResInfo;
