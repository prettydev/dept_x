import React, { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import Container from "../../components/UI/Container";
import Carousel from "./carousel";
import { SectionHeader, CircleLoader } from "../style";
import SectionWrapper, { CarouselWrapper } from "./testimonial.style";

import { testimonialData } from "../../data";

const Testimonial = () => {
  const { title, slogan, reviews } = testimonialData;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <SectionWrapper id="testimonial">
      <Container width="1360px">
        <SectionHeader>
          <Heading as="h5" content={title} />
          <Heading content={slogan} />
        </SectionHeader>
        <CarouselWrapper>
          {loading ? (
            <Carousel data={reviews} />
          ) : (
            <CircleLoader className="alt">
              <div className="circle"></div>
              <div className="circle"></div>
            </CircleLoader>
          )}
        </CarouselWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default Testimonial;
