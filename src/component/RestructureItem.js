import { Link } from "react-router-dom";
import { FaSearchPlus } from "react-icons/fa";
import styled from "styled-components";

const Box = styled.div`
  position: relative;
  width: 90vw;
  border-top: 1px solid #dee2e6;
  margin-top: 5vh;
  padding-top: 2vh;
  display: flex;
  align-items: flex-start;
`;

const Image = styled.img`
  margin: 2vh;
  border-radius: 5vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3vw;
`;

const Name = styled.h2`
  margin-top: 3vh;
  margin-left: 20vw;
  font-size: 4vw;
`;

const Description = styled.p`
  margin-left: 7vw;
  font-size: 4vw;
  color: #6d6b6b;
  text-align: left;
`;

const Icon = styled(FaSearchPlus)`
  font-size: 6vw;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1vh;
  &:hover {
    color: #c35050;
  }
`;
//메뉴판 재구성 아이템
const RestructureItem = ({ food }) => {
  const { id, FoodImage, FoodName, caption, FoodProfile } = food;

  //유효한 이미지 URL을 나타내는 문자열인지 확인
  const renderImage = typeof FoodImage === "string" && FoodImage.trim() !== "";

  return (
    <Box>
      {renderImage && (
        <div>
          <div key={id}>
            <Image src={FoodImage} alt={caption} />
          </div>
        </div>
      )}
      <Container>
        <Name>{FoodName}</Name>
        <Description>{FoodProfile}</Description>
      </Container>
      <Link key={id} to={`/main/picture/resutucture/detail/${id}`}>
        <Icon />
      </Link>
    </Box>
  );
};

export default RestructureItem;
