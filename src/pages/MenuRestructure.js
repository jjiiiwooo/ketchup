import { useState, useEffect } from "react";
import axios from "axios";
import RestructureItem from "../component/RestructureItem";

//메뉴판 이미지 업로드했을 때 메뉴판 재구성 화면
const MenuRestructure = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await axios.get("http://localhost:8080/Restructure");
        setMenu(response.data);
      } catch (error) {
        console.error("음식 데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    getMenu();
  }, []);

  return (
    <div>
      {menu.map((food) => (
        <RestructureItem key={food.id} food={food} />
      ))}
    </div>
  );
};

export default MenuRestructure;
