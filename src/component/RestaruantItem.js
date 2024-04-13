import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Container = styled.div`
  box-sizing: content-box;
  border-radius: 30px;
  place-items: center;
  border: 1px solid #dee2e6;

  & img {
    border-radius: 30px;
    object-fit: scale-down;
  }

  .name {
    font-weight: bold;
    padding-left: 2vw;
    margin-bottom: -1vw;
  }

  .box {
    display: flex;
    margin-left: 2vw;

    .review {
      padding-left: 2vw;
    }
  }

  //컴포넌트간 간격
  & {
    border-top: 1px solid #dee2e6;
    margin: 2vh;
  }
`;

function RestaruantItem({ id, name, img, review, star, location }) {
  return (
    <Link
      to={`/menulist/${id}?name=${name}&star=${star}&location=${location}&img=${img}`}
    >
      <Container>
        <img src={img} alt={name} />
        <p className="name">{name}</p>
        <div className="box">
          <p className="star">
            <FaStar color="yellow" />
            {star}
          </p>
          <p className="review">(리뷰:{review})</p>
        </div>
      </Container>
    </Link>
  );
}

export default RestaruantItem;
