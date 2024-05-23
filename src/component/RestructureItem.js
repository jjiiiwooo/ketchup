//메뉴판 재구성 아이템
const RestructureItem = ({ food }) => {
  const { id, FoodImage, FoodName, caption } = food;

  return (
    <div>
      <div>
        <div key={id}>
          <img src={FoodImage} alt={caption} />
        </div>
      </div>
      <div>
        <p>{FoodName}</p>
      </div>
    </div>
  );
};

export default RestructureItem;
