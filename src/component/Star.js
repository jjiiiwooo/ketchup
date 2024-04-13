import { FaStar } from "react-icons/fa";
const Star = ({ star }) => {
  const total = 5;
  const filledStar = Math.round(star);

  return (
    <div>
      {[...Array(total)].map((_, index) => {
        const isFilled = index < filledStar;
        return (
          <span key={index}>
            {isFilled ? <FaStar color="gold" /> : <FaStar color="gray" />}
          </span>
        );
      })}
      {star}
    </div>
  );
};

export default Star;
