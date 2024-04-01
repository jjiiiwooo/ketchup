import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import RestaruantItem from "./RestaruantItem";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
function RestaruantList() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/Restaruant")
      .then((response) => {
        setRes(response.data);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다.: ", error);
      });
  }, []);

  //axios로 받은 데이터를 RestaruntItem Props로 전달
  return (
    <Wrapper>
      {res.map((item) => (
        <RestaruantItem
          name={item.name}
          img={item.img}
          review={item.review}
          star={item.star}
        />
      ))}
    </Wrapper>
  );
}

export default RestaruantList;
