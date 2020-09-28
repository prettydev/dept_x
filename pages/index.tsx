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

import {
  GlobalStyle,
  InteriorWrapper,
  ContentWrapper,
} from "../containers/style";
import ScrollSpyMenu from "../components/ScrollSpyMenu";
import { menuData } from "../data";
import "rc-drawer/assets/index.css";

const LandingPage = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={landingTheme}>
        <ResetCSS />
        <GlobalStyle />
        <InteriorWrapper>
          {/* <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <Navbar />
          </Sticky> */}
          <Drawer placement="right">
            <ScrollSpyMenu
              className=""
              menuItems={menuData}
              drawerClose={true}
              offset={-100}
            />
          </Drawer>
          <ContentWrapper>
            <Banner />
            <AboutUs />
            <Events />
            <Register />
          </ContentWrapper>
        </InteriorWrapper>
      </ThemeProvider>
    </AppProvider>
  );
};

export default LandingPage;
