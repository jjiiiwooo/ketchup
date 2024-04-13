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

  useEffect(() => {
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
            review={item.review}
            star={item.star}
            location={item.location}
          />
        ))}
      </Wrapper>
    </div>
  );
}

export default RestaruantList;
