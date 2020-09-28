import React from "react";
import Sticky from "react-stickynode";
import { ThemeProvider } from "styled-components";
import { landingTheme } from "../theme";
import { DrawerProvider } from "../contexts/DrawerContext";
import Navbar from "../containers/Navbar";
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

// import Layout from "../components/UI/Layout";
// const LandingPage = (props) => <Layout title="Home | DEPT_X"></Layout>;

const LandingPage = () => {
  return (
    <ThemeProvider theme={landingTheme}>
      <>
        <ResetCSS />
        <GlobalStyle />
        {/* Start writing your markup from here. */}
        <InteriorWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <ContentWrapper>
            <Banner />
            <AboutUs />
            <Events />
            <Register />
          </ContentWrapper>
          {/* <Footer /> */}
        </InteriorWrapper>
        {/* End of markup section. */}
      </>
    </ThemeProvider>
  );
};

export default LandingPage;
