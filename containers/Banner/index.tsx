import React, { useState, useEffect } from "react";

import { Carousel } from "react-responsive-carousel";
import colors from "../../theme/colors";

import "./banner.module.scss";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div id="banner" className="bg-gray-900 min-h-screen">
      <Carousel
        className="presentation-mode"
        infiniteLoop={true}
        autoPlay={false}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        transitionTime={2000}
        interval={5000}
      >
        <div
          key={0}
          style={{
            background: `url('${require("./banner1.jpg")}') no-repeat center center`,
            backgroundSize: "cover",
          }}
          className="my-slide primary min-h-screen"
        >
          <div className="w-1/2 h-full text-center flex">
            <div className="text-left justify-items-start mx-auto flex flex-col gap-12 mt-48">
              <img src={require("./logo.svg")} />
              <div className="flex flex-col gap-12">
                <div>
                  <h1 className="text-white text-4xl mt-8">
                    GET <span style={{ color: colors.primary }}>10% OFF</span>{" "}
                    IN KANAHEI
                  </h1>
                  <p className="text-white text-2xl ">
                    LIVE PRINTING T-SHIRT AND TOTE BAG DON'T MISS OUT!
                  </p>
                </div>
                <p className="text-white text-xl">
                  CREATE YOUR OWN KANAHEI FAVOUR
                </p>
                <button
                  className="p-4 w-1/4 text-white font-bold rounded-full"
                  style={{ backgroundColor: colors.primary }}
                >
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          key={1}
          style={{
            background: `url('${require("./banner2.jpg")}') no-repeat center center`,
            backgroundSize: "cover",
          }}
          className="my-slide secondary min-h-screen"
        >
          <div className="w-1/2 h-full text-center flex">
            <div className="text-left justify-items-start mx-auto mt-64 flex flex-col gap-10">
              <p className="text-white text-2xl">OUR e - SHOP</p>
              <h1 className="text-white text-4xl">
                COMMING SOON<span style={{ color: colors.primary }}>_</span>
              </h1>
              <p className="text-white text-xl">www.deptx.com</p>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
