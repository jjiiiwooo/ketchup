import Header from "../component/Common/Header";
import BottomNav from "../component/Common/BottomNav";
import TypeSlider from "../component/TypeSlider";
import Sortselect from "../component/Sortselect";
import RestaruantList from "../component/RestaruantList";

const Main = () => {
  return (
    <>
      <Header />
      <TypeSlider />
      <Sortselect />
      <RestaruantList />
      <BottomNav />
    </>
  );
};

export default Main;
