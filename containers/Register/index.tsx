import React from "react";

const Register = () => {
  return (
    <div id="register" className="min-h-screen flex flex-row">
      <div className="flex flex-col gap-12 w-1/2">
        <div className="w-3/5 mx-auto my-auto flex flex-col gap-12">
          <h1 className="text-4xl mt-8">E-MAIL REGISTER</h1>
          <div>
            <p className="text-2xl ">
              GET{" "}
              <span className="text-yellow-500 text-2xl">10% DISCOUNT!</span>
            </p>
            <p className="text-2xl">ON LIVE PRINTING T-SHIRT AND TOTE BAG</p>
          </div>
          <input className="w-3/4 rounded-full h-12 border border-1 border-gray-700 px-6" />
          <button className="bg-yellow-500 p-4 w-1/4 text-white font-bold rounded-full">
            SUBMIT
          </button>
        </div>
      </div>

      <div
        style={{
          background: `url('${require("./banner.svg")}') no-repeat center center`,
          backgroundSize: "cover",
        }}
        className="w-1/2"
      ></div>
    </div>
  );
};

export default Register;
