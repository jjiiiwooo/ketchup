import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdCameraAlt } from "react-icons/md";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
`;

const BottomNav = () => {
  const [value, setValue] = useState("Main");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Main"
          value="main"
          icon={<MdHome size={40} />}
        />
        <BottomNavigationAction
          label="Camera"
          icon={<MdCameraAlt size={40} />}
          component={Link}
          to="/main/picture"
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<MdSearch size={40} />}
        />
      </BottomNavigation>
    </Wrapper>
  );
};

export default BottomNav;
