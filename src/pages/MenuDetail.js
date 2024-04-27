import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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

const MenuDetail = () => {
  const { id, Food_id } = useParams();
  const [food, setFood] = useState(null);

  //전달받은 id를 사용에 식당을 불러오고
  // find 메서드를 사용하여 전달받은 Food_id와 일치하는 음식 데이터를 불러옴

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Restaruant/${id}`)
      .then((res) => {
        const restaurant = res.data;
        const foundFood = restaurant.food.find(
          (food) => food.Food_id === parseInt(Food_id)
        );
        setFood(foundFood);
      })
      .catch((error) => {
        console.error("데이터를 불러오는데 실패하였습니다.", error);
      });
  }, [id, Food_id]);

  return (
    <div>
      {food ? (
        <Box>
          <img className="Image" src={food.FoodImage} alt={food.FoodName} />
          <p className="Name">{food.FoodName}</p>
        </Box>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default MenuDetail;
