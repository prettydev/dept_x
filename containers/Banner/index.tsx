import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import AwesomeSlider from "react-awesome-slider";

import BannerWrapper, { Container } from "./banner.style";

import FullpageSlider from "../../components/Slider/fullpage/fullpage";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <BannerWrapper>
      <Container>
        <FullpageSlider />
      </Container>
    </BannerWrapper>
  );
};

export default Banner;
