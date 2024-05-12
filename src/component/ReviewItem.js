const ReviewItem = ({ review, writer }) => {
  //review.userid에 맞는 user의 닉네임 들고오기

  //userid에 해당하는 작성자 찾기
  const user = writer.find((user) => user.id === review.userid);

  return (
    <>
      <div>{user && user.nickname}</div>
      <div>{review.date}</div>
      <div>{review.content}</div>
      {review.image && <img src={review.image} alt="" />}
    </>
  );
};

export default ReviewItem;
