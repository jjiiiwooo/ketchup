import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import RestaruantItem from "./RestaruantItem";
import Sortselect from "./Sortselect";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function RestaruantList({ type }) {
  const [res, setRes] = useState([]);
  const [sort, setSort] = useState("");
  const [reviewCnt, setReviewCnt] = useState({});

  //리뷰 개수 가져오기
  const getReview = () => {
    try {
      const response = axios.get("http://localhost:8080/RestrauntReview");
      const reviews = response.data;
      const count = {};

      reviews.forEach((item) => {
        const restaurantId = item.redid;

        if (count[restaurantId]) {
          count[restaurantId]++;
        } else {
          count[restaurantId] = 1;
        }
      });
      setReviewCnt(count);
    } catch (error) {
      console.log("리뷰 데이터를 가져오는데 실패했습니다.:", error);
    }
  };

  useEffect(() => {
    getReview();

    axios
      .get(
        type
          ? `http://localhost:8080/Restaruant?type=${type}`
          : "http://localhost:8080/Restaruant",
        sort ? { params: { _sort: sort, _order: "desc" } } : {}
      )
      .then((response) => {
        setRes(response.data);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다.: ", error);
      });
  }, [type, sort]);

  //정렬 기준 변경 함수
  const onSortChange = (selectedSort) => {
    setSort(selectedSort);
  };

  //axios로 받은 데이터를 RestaruntItem Props로 전달
  return (
    <div>
      <Sortselect onSortChange={onSortChange} />
      <Wrapper>
        {res.map((item) => (
          <RestaruantItem
            key={item.id}
            id={item.id}
            name={item.name}
            img={item.img}
            star={item.star}
            location={item.location}
            food={item.food}
            review={reviewCnt[item.id] || 0}
          />
        ))}
      </Wrapper>
    </div>
  );
}

export default RestaruantList;
