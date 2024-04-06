import Slider from "react-slick";
import "../style/slick.css";
import "../style/slick-theme.css";
import styled from "styled-components";
import { useState } from "react";
import RestaruantList from "./RestaruantList";
import Sortselect from "./Sortselect";

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
  const [category, setCategory] = useState("전체"); //카테고리

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
      case "한식":
        return <RestaruantList type="한식" />;
      case "일식":
        return <RestaruantList type="일식" />;
      case "중식":
        return <RestaruantList type="중식" />;
      case "양식":
        return <RestaruantList type="양식" />;
      case "디저트":
        return <RestaruantList type="디저트/베이커리" />;
      default:
        return <RestaruantList />;
    }
  };

  const onCategory = (category) => {
    setCategory(category);
  };

  return (
    <Wrapper>
      <Title>카테고리</Title>
      <div className="slider-container">
        <Slider {...settings}>
          <div onClick={() => onCategory("전체")}>
            <Category className={category === "전체" ? "active" : ""}>
              전체
            </Category>
          </div>
          <div onClick={() => onCategory("한식")}>
            <Category className={category === "한식" ? "active" : ""}>
              한식
            </Category>
          </div>
          <div onClick={() => onCategory("일식")}>
            <Category className={category === "일식" ? "active" : ""}>
              일식
            </Category>
          </div>
          <div onClick={() => onCategory("중식")}>
            <Category className={category === "중식" ? "active" : ""}>
              중식
            </Category>
          </div>
          <div onClick={() => onCategory("양식")}>
            <Category className={category === "양식" ? "active" : ""}>
              양식
            </Category>
          </div>
          <div onClick={() => onCategory("디저트")}>
            <Category className={category === "디저트" ? "active" : ""}>
              디저트
            </Category>
          </div>
        </Slider>
      </div>
      <div>
        <Sortselect />
        {List()}
      </div>
    </Wrapper>
  );
}

export default TypeSlider;
