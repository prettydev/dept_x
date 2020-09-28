import React from "react";
import Drawer from "rc-drawer";
import Sticky from "react-stickynode";
import { ThemeProvider } from "styled-components";
import { landingTheme } from "../theme";
import { AppProvider } from "../contexts/AppContext";
import Banner from "../containers/Banner";
import Events from "../containers/Events";
import Register from "../containers/Register";
import AboutUs from "../containers/AboutUs";
import { ResetCSS } from "../assets/css/style";

import { GlobalStyle, InteriorWrapper } from "../containers/style";
import ScrollSpyMenu from "../components/ScrollSpyMenu";
import { DrawerProvider } from "../contexts/DrawerContext";

import "rc-drawer/assets/index.css";

const menuData = [
  {
    label: "HOME",
    path: "#banner",
    offset: "80",
  },
  {
    label: "ABOUT US",
    path: "#about",
    offset: "80",
  },
  {
    label: "ORDER INSTRUCTION",
    path: "#events",
    offset: "80",
  },
  {
    label: "REGISTER",
    path: "#register",
    offset: "80",
  },
];

const LandingPage = () => {
  return (
    <DrawerProvider>
      <ThemeProvider theme={landingTheme}>
        <ResetCSS />
        <GlobalStyle />
        <InteriorWrapper>
          {/* <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <Navbar />
          </Sticky> */}

          {/* <Drawer placement="right"> */}
          {/* <ScrollSpyMenu
              className=""
              menuItems={menuData}
              drawerClose={true}
              offset={-100}
            /> */}
          {/* </Drawer> */}

          <Banner key="banner" />
          <AboutUs key="about" />
          <Events key="events" />
          <Register key="register" />
        </InteriorWrapper>
      </ThemeProvider>
    </DrawerProvider>
  );
};

export default LandingPage;
