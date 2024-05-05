const TextField = () => {
  //현재 로그인한 사용자 닉네임 가져오기
  //로컬 스토리지에 저장된 user 데이터 읽기
  const user = JSON.parse(localStorage.getItem("user"));

  return <div>{user && user.nickname}</div>;
};

export default TextField;
