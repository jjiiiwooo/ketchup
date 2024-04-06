import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Container = styled.div`
  place-items: center;
  border-top: 1px solid #dee2e6;
  //컴포넌트간 간격
  & {
    border-top: 1px solid #dee2e6;
    margin-left: 2vh;
  }
`;

const Image = styled.img`
  border-radius: 30px;
  object-fit: scale-down;
`;

const Name = styled.div``;

function RestaruantItem({ name, img, review, star }) {
  return (
    <Container>
      <Image src={img} alt={name} />
      <Name>{name}</Name>
      <p>(리뷰:{review})</p>
      <p>
        <FaStar color="yellow" />
        {star}
      </p>
    </Container>
  );
}

export default RestaruantItem;
