import { FaSearchPlus } from "react-icons/fa";
import styled from "styled-components";

const Box = styled.div`
  width: 90vw;
  border-top: 1px solid #dee2e6;
  margin-top: 5vh;
  padding-top: 2vh;
`;

//메뉴판 재구성 아이템
const RestructureItem = ({ food }) => {
  const { id, FoodImage, FoodName, caption, FoodProfile } = food;

  return (
    <Box>
      <div>
        <div key={id}>
          <img src={FoodImage} alt={caption} />
        </div>
      </div>
      <div>
        <p>{FoodName}</p>
      </div>
      <div>{FoodProfile}</div>
      <FaSearchPlus />
    </Box>
  );
};

export default RestructureItem;
