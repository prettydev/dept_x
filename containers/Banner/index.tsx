import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div id="banner" className="bg-gray-900 min-h-screen">
      <Slider autoplay={3000} className="w-screen h-screen pt-0 px-0 absolute">
        <div
          key={0}
          style={{
            background: `url('${require("./banner1.svg")}') no-repeat center center`,
            backgroundSize: "cover",
          }}
        >
          <div className="w-1/2 h-full text-center flex">
            <div className="text-left justify-items-start mx-auto my-auto flex flex-col gap-12">
              <img src={require("./logo.svg")} />
              <div className="flex flex-col gap-12">
                <div>
                  <h1 className="text-white text-4xl mt-8">
                    GET <span className="text-yellow-500">10% OFF</span> IN
                    KANAHEI
                  </h1>
                  <p className="text-white text-2xl ">
                    LIVE PRINTING T-SHIRT AND TOTE BAG DON'T MISS OUT!
                  </p>
                </div>
                <p className="text-white text-xl">
                  CREATE YOUR OWN KANAHEI FAVOUR
                </p>
                <button className="bg-yellow-500 p-4 w-1/4 text-white font-bold rounded-full">
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          key={1}
          style={{
            background: `url('${require("./banner2.svg")}') no-repeat center center`,
            backgroundSize: "cover",
          }}
        >
          <div className="w-1/2 h-full text-center flex">
            <div className="text-left justify-items-start mx-auto my-auto flex flex-col gap-10">
              <p className="text-white text-2xl">OUR e - SHOP</p>
              <h1 className="text-white text-4xl">
                COMMING SOON<span className="text-yellow-500">_</span>
              </h1>
              <p className="text-white text-xl">www.deptx.com</p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
