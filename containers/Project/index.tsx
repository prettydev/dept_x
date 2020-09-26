import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";
import Text from "../../components/Text";
import Heading from "../../components/Heading";
import Image from "../../components/Image";
import Container from "../../components/UI/Container";
import GlideCarousel from "../../components/GlideCarousel";
import GlideSlide from "../../components/GlideCarousel/glideSlide";
import { SectionHeader } from "../style";
import SectionWrapper, {
  ProjectWrapper,
  TextWrapper,
  ImageWrapper,
} from "./project.style";

import { projectData } from "../../data";

const Project = () => {
  const { title, slogan, thumb_url, projects } = projectData;
  const glideOptions = {
    type: "carousel",
    perView: 1,
    gap: 0,
  };

  return (
    <SectionWrapper id="project">
      <Container width="1360px">
        <Fade bottom>
          <SectionHeader>
            <Heading as="h5" content={title} />
            <Heading content={slogan} />
          </SectionHeader>
        </Fade>

        <ProjectWrapper>
          <GlideCarousel
            carouselSelector="project_carousel"
            options={glideOptions}
            nextButton={<span className="next_arrow" />}
            prevButton={<span className="prev_arrow" />}
          >
            <Fragment>
              {projects.map((project) => (
                <GlideSlide key={`project_key${project.id}`}>
                  <TextWrapper>
                    <Text content={project.text} />
                    <Text content={project.text2} />
                  </TextWrapper>
                </GlideSlide>
              ))}
            </Fragment>
          </GlideCarousel>

          <ImageWrapper>
            <Image src={thumb_url} alt="Interiro landing by RedQ" />
          </ImageWrapper>
        </ProjectWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default Project;
