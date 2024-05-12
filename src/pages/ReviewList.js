import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReviewItem from "../component/ReviewItem";
import styled from "styled-components";
import { SlNote } from "react-icons/sl";

const Text = styled.div`
  font-size: 4vh;
  font-weight: bold;
  padding-top: 2vh;
  padding-bottom: 2vh;
`;
const Box = styled.div`
  position: fixed;
  bottom: 4vh;
  right: 5vh;
`;
const WriteButton = styled.button`
  background-color: white;
  border: 2px solid #d9d9d9;
  border-radius: 2vh;
  font-size: 2vh;
  color: #c35050;
  padding: 2vw;
  display: flex;
  font-weight: bold;
  align-items: center;
  gap: 1vh;
`;

const ReviewList = () => {
  const { id } = useParams(); //useParams로 ResInfo 컴포넌트에서 전달받은 id사용
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0); //리뷰 개수
  const [writer, setWriter] = useState([]); //리뷰 작성자

  //리뷰 작성 페이지로 이동
  const gotoReviewWrite = () => {
    navigate(`/main/menulist/${id}/reviewList/write`);
  };

  //식당 id에 맞는 리뷰 불러오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/RestrauntReview")
      .then((res) => {
        const restaurantReviews = res.data;
        const foundReviews = restaurantReviews.filter(
          (review) => review.resid === parseInt(id)
        );
        setReviews(foundReviews);
        // 리뷰 개수 담기
        setCount(foundReviews.length);
      })
      .catch((error) => {
        console.log("리뷰 데이터를 불러오는데 실패하였습니다.", error);
      });

    //작성자 표시를 위해 Users 데이터도 불러오기
    axios
      .get("http://localhost:8080/Users")
      .then((res) => {
        setWriter(res.data);
      })
      .catch((error) => {
        console.log("사용자 데이터를 불러오는데 실패하였습니다.", error);
      });
  }, [id]);

  //axios로 받은 데이터를 ReviewItem Props로 전달

  return (
    <>
      <Text>{count}개의 리뷰</Text>
      <div>
        {reviews.map((review) => (
          <ReviewItem key={review.Rev_id} review={review} writer={writer} />
        ))}
      </div>
      <Box>
        <WriteButton onClick={gotoReviewWrite}>
          리뷰작성
          <SlNote />
        </WriteButton>
      </Box>
    </>
  );
};

export default ReviewList;