import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Profile from "../component/Profile";
import Nutrition from "../component/Nutrition";

const Box = styled.div`
  display: flex;
  flex-direction: column; //수직정렬
  align-items: center;

  .Image {
    margin-top: 6vh;
    border-radius: 3vw;
    width: 80vw;
    height: 35vh;
  }

  .Name {
    margin-top: 3vh;
    text-align: center;
    font-weight: bold;
    font-size: 5vw;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 2vh;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 4vh;
`;

const Button = styled.button`
  margin: 0 3vw;
  padding: 1vh 2vw;
  font-size: 4vw;
  font-weight: bold;
  background-color: #ffffff;
  color: #c35050;
  border-color: #c35050;
  border-radius: 1vw;
  box-shadow: 0 0.2vw 0.5vw rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 1vw 1vw -5px;
  }
`;
const RestructureDetail = () => {
  const { id } = useParams(); //useParams를 통해 URL에서 추출한 id 가져오기
  const [food, setFood] = useState({});
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Restructure/${id}`)
      .then((res) => {
        setFood(res.data);
      })
      .catch((error) => {
        console.error("음식 데이터를 들고오는데 오류가 발생했습니다:", error);
      });
  }, [id]);

  const ButtonClick = (type) => {
    if (type === "profile") {
      setContent("profile");
    } else if (type === "nutrition") {
      setContent("nutrition");
    }
  };

  return (
    <div>
      {food ? (
        <Box>
          <img
            style={{ width: "420px", height: "320px" }}
            className="Image"
            src={food.FoodImage}
            alt={food.FoodName}
          />
          <p className="Name">{food.FoodName}</p>
          <ButtonBox>
            <Button onClick={() => ButtonClick("profile")}>Description</Button>
            <Button onClick={() => ButtonClick("nutrition")}>Nutrition</Button>
          </ButtonBox>
          {content === "profile" && <Profile food={food} />}
          {content === "nutrition" && <Nutrition food={food} />}
        </Box>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default RestructureDetail;
