import React, { useRef } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "react-awesome-slider/dist/custom-animations/fall-animation.css";
import "react-awesome-slider/dist/custom-animations/fold-out-animation.css";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import "react-awesome-slider/dist/custom-animations/open-animation.css";
import {
  withNavigationHandlers,
  withNavigationContext,
} from "react-awesome-slider/dist/navigation";
import { media } from "./media";
import Startup from "../startup/startup";

export default () => {
  const isFirstLoad = useRef(true);
  const animation = `foldOutAnimation`;

  return (
    <AwesomeSlider
      startupScreen={<Startup />}
      startupDelay={275}
      animation={animation}
      className="awesome-slider"
      onTransitionEnd={() => {
        if (isFirstLoad.current === true) {
          document.querySelector("body").classList.add("animated");
          document.querySelector("body").classList.add("visible");
        }
      }}
      media={media}
    />
  );
};
