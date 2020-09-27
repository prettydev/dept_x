import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Icon } from "react-icons-kit";
import { androidClose } from "react-icons-kit/ionicons/androidClose";
import NavbarWrapper from "../../components/Navbar";
import Drawer from "../../components/Drawer";
import Logo from "../../components/UIElements/Logo";
import HamburgMenu from "../../components/HamburgMenu";
import ScrollSpyMenu from "../../components/ScrollSpyMenu";
import { DrawerContext } from "../../contexts/DrawerContext";
import { Container } from "./navbar.style";

import { menuData } from "../../data";
import logo from "../../assets/image/logo.svg";

const Navbar = ({ navbarStyle, logoStyle }) => {
  const { state, dispatch } = useContext(DrawerContext);

  const toggleHandler = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  return (
    <NavbarWrapper {...navbarStyle}>
      <Container>
        {/* <Logo href="/" logoSrc={logo} title="DEPT_X" logoStyle={logoStyle} /> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Drawer
            width="420px"
            placement="right"
            drawerHandler={<HamburgMenu />}
            open={state.isOpen}
            toggleHandler={toggleHandler}
          >
            <button
              type="button"
              className={state.isOpen ? "active" : ""}
              onClick={toggleHandler}
              aria-label="drawer toggle button"
            >
              <Icon icon={androidClose} />
            </button>
            <ScrollSpyMenu
              menuItems={menuData}
              drawerClose={true}
              offset={-100}
            />
          </Drawer>
        </div>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
};

Navbar.defaultProps = {
  navbarStyle: {
    minHeight: "70px",
    maxHeight: "100vh",
  },
  logoStyle: {
    width: "128px",
    height: "auto",
  },
};

export default Navbar;
