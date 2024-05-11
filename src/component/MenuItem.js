import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaSearchPlus } from "react-icons/fa";

const Box = styled.div`
  width: 90vw;
  border-top: 1px solid #dee2e6;
  margin-top: 5vh;
  padding-top: 2vh;
`;

const Wrapper = styled.div`
  display: flex;

  .image {
    margin: 2vh;
    border-radius: 5vw;
    max-width: 40%;
    height: auto;
  }

  .container {
    display: flex;
    flex-direction: column;
  }
  .Name {
    margin-top: 3vh;
    margin-left: 20vw;
    font-size: 4vw;
  }

  .description {
    margin-left: 7vw;
    font-size: 4vw;
    color: #6d6b6b;
    text-align: left;
  }

  .search {
    margin-left: auto;
    display: flex;
    align-items: center;
    margin-left: 90%;
    &:hover {
      color: #c35050;
    }
  }
`;

const MenuItem = () => {
  const { id } = useParams(); //useParmas로 id 가져오기
  const [food, setFood] = useState([]); //데이터 상태

  useEffect(() => {
    //id에 해당하는 음식 데이터 가져오기
    axios
      .get(`http://localhost:8080/Restaruant/${id}`)
      .then((res) => {
        const resData = res.data;

        //가져온 음식 데이터 설정
        setFood(resData.food);
      })
      .catch((error) => {
        alert("데이터를 가져오는 데 실패했습니다", error);
      });
  }, [id]);

  return (
    <>
      <div>
        {food.map((item) => (
          <Box key={item.Food_id}>
            <div>
              <Wrapper>
                <img
                  className="image"
                  style={{ width: "160px", height: "160px" }}
                  src={item.FoodImage}
                  alt={item.caption}
                />
                <div className="container">
                  <h2 className="Name">{item.FoodName}</h2>
                  <p className="description">{item.FoodProfile}</p>
                  <Link
                    to={`/main/menulist/${id}/${item.Food_id}`}
                    key={item.Food_id}
                  >
                    <div className="search">
                      <FaSearchPlus size={25} />
                    </div>
                  </Link>
                </div>
              </Wrapper>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
};

export default MenuItem;
