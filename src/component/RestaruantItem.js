import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Container = styled.div`
  border-radius: 30px;
  border-top: 1px solid #dee2e6;

  //컴포넌트간 간격
  & {
    border-top: 1px solid #dee2e6;
    margin-left: 2vh;
  }
`;

function RestaruantItem({ name, img, review, star }) {
  return (
    <Container>
      <img src={img} alt={name} />
      <p>{name}</p>
      <p>(리뷰:{review})</p>
      <p>
        <FaStar color="yellow" />
        {star}
      </p>
    </Container>
  );
}

export default RestaruantItem;
