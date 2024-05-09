import Slider from "react-slick";
import "../style/slick.css";
import "../style/slick-theme.css";
import styled from "styled-components";
import { useState } from "react";
import RestaruantList from "./RestaruantList";

const Wrapper = styled.div`
  margin: 0 auto;
  padding-top: 15vh;
  padding-left: 10vw;
  padding-right: 10vw;
  font-size: 2vh;
`;

const Title = styled.div`
  color: #c35050;
  font-weight: bold;
`;

const Category = styled.h4`
  color: #000;

  &.active {
    color: #c35050;
    font-weight: bold;
  }
`;
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function TypeSlider() {
  const [category, setCategory] = useState("전체"); //카테고리 상태

  const settings = {
    className: "center",
    dots: false,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  //카테고리별로 조건부 렌더링
  const List = () => {
    switch (category) {
      case "Korean cuisine":
        return <RestaruantList type="Korean cuisine" />;
      case "Japanese cuisine":
        return <RestaruantList type="Japanese cuisine" />;
      case "Chinese cuisine":
        return <RestaruantList type="Chinese cuisine" />;
      case "Western cuisine":
        return <RestaruantList type="Western cuisine" />;
      case "Dessert":
        return <RestaruantList type="Dessert" />;
      default:
        return <RestaruantList />;
    }
  };

  //카테고리 선택 함수
  const onCategory = (category) => {
    setCategory(category);
  };

  return (
    <Wrapper>
      <Title>Category</Title>
      <div className="slider-container">
        <Slider {...settings}>
          <div onClick={() => onCategory("All")}>
            <Category className={category === "All" ? "active" : ""}>
              All
            </Category>
          </div>
          <div onClick={() => onCategory("Korean cuisine")}>
            <Category className={category === "Korean cuisine" ? "active" : ""}>
              Korean cuisine
            </Category>
          </div>
          <div onClick={() => onCategory("Japanese cuisine")}>
            <Category
              className={category === "Japanese cuisine" ? "active" : ""}
            >
              Japanese cuisine
            </Category>
          </div>
          <div onClick={() => onCategory("Chinese cuisine")}>
            <Category
              className={category === "Chinese cuisine" ? "active" : ""}
            >
              Chinese cuisine
            </Category>
          </div>
          <div onClick={() => onCategory("Western cuisine")}>
            <Category
              className={category === "Western cuisine" ? "active" : ""}
            >
              Western cuisine
            </Category>
          </div>
          <div onClick={() => onCategory("Dessert")}>
            <Category className={category === "Dessert" ? "active" : ""}>
              Dessert
            </Category>
          </div>
        </Slider>
      </div>
      <div>{List()}</div>
    </Wrapper>
  );
}

export default TypeSlider;
