import Slider from "react-slick";
import "../style/slick.css";
import "../style/slick-theme.css";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  padding-top: 15vh;
  padding-left: 10vw;
  padding-right: 10vw;
  font-size: 2vh;
`;

const Category = styled.div`
  color: #c35050;
  font-weight: bold;
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

  return (
    <Wrapper>
      <Category>카테고리</Category>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <h4>전체</h4>
          </div>
          <div>
            <h4>한식</h4>
          </div>
          <div>
            <h4>일식</h4>
          </div>
          <div>
            <h4>중식</h4>
          </div>
          <div>
            <h4>양식</h4>
          </div>
          <div>
            <h4>디저트</h4>
          </div>
        </Slider>
      </div>
    </Wrapper>
  );
}

export default TypeSlider;
