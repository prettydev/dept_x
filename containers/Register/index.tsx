import React from "react";
import colors from "../../theme/colors";

const Register = () => {
  return (
    <div id="register" className="min-h-screen flex flex-row">
      <div className="flex flex-col gap-12 w-1/2">
        <div className="w-3/5 mx-auto my-auto flex flex-col gap-12">
          <h1 className="text-4xl mt-8">E-MAIL REGISTER</h1>
          <div>
            <p className="text-2xl ">
              GET{" "}
              <span className="text-2xl" style={{ color: colors.primary }}>
                10% DISCOUNT!
              </span>
            </p>
            <p className="text-2xl">ON LIVE PRINTING T-SHIRT AND TOTE BAG</p>
          </div>
          <input className="w-3/4 rounded-full h-12 border border-1 border-gray-700 px-6" />
          <button
            className="p-4 w-1/4 text-white font-bold rounded-full"
            style={{ backgroundColor: colors.primary }}
          >
            SUBMIT
          </button>
        </div>
      </div>

      <div
        style={{
          background: `url('${require("./banner.jpg")}') no-repeat center center`,
          backgroundSize: "cover",
        }}
        className="w-1/2"
      ></div>
    </div>
  );
};

export default Register;
