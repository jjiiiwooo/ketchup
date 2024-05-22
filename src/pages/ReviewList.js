import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../component/firebaseConfig"; // Firebase 설정 파일에서 database 임포트
import ReviewItem from "../component/ReviewItem";
import styled from "styled-components";
import { SlNote } from "react-icons/sl";
import { AuthContext } from "../Context/AuthContext";

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
  const { id } = useParams(); // useParams로 ResInfo 컴포넌트에서 전달받은 id사용
  const navigate = useNavigate();
  const { state } = useContext(AuthContext); // 현재 로그인한 사용자 상태 가져옴

  const [reviews, setReviews] = useState([]); // 리뷰 목록 상태
  const [count, setCount] = useState(0); // 리뷰 개수
  const [writer, setWriter] = useState([]); // 리뷰 작성자

  // 리뷰 작성 페이지로 이동
  const gotoReviewWrite = () => {
    navigate(`/main/menulist/${id}/reviewList/write`);
  };

  // 식당 id에 맞는 리뷰 불러오기
  useEffect(() => {
    const fetchReviewsAndUsers = async () => {
      try {
        // 리뷰 데이터 가져오기
        const reviewsSnapshot = await database
          .ref("RestrauntReview")
          .once("value");
        const reviewsData = reviewsSnapshot.val();
        const foundReviews = Object.values(reviewsData || {}).filter(
          (review) => review.resid === parseInt(id)
        );
        setReviews(foundReviews);
        setCount(foundReviews.length);

        // 사용자 데이터 가져오기
        const usersSnapshot = await database.ref("Users").once("value");
        const usersData = usersSnapshot.val();
        setWriter(Object.values(usersData || {}));
      } catch (error) {
        console.log("데이터를 불러오는데 실패하였습니다.", error);
      }
    };

    fetchReviewsAndUsers();
  }, [id]);

  // 리뷰 삭제 후 개수 업데이트
  const handleReviewDelete = (reviewId) => {
    setReviews((prev) => prev.filter((review) => review.Rev_id !== reviewId));
    setCount((prev) => prev - 1); // 리뷰 개수 1 감소
  };

  // Firebase에서 리뷰 삭제
  const deleteReview = async (reviewId) => {
    try {
      await database.ref(`RestrauntReview/${reviewId}`).remove();
      handleReviewDelete(reviewId);
    } catch (error) {
      console.error("리뷰를 삭제하는데 실패하였습니다.", error);
    }
  };

  return (
    <>
      <Text>{count}개의 리뷰</Text>
      <div>
        {reviews.map((review) => (
          <ReviewItem
            key={review.Rev_id}
            review={review}
            writer={writer}
            loggedInUser={
              state.isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null
            }
            onReviewDelete={deleteReview}
          />
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
