import React from "react";

const AboutUs = () => {
  return (
    <div
      id="about"
      style={{
        background: `url('${require("./banner.svg")}') no-repeat center center`,
        backgroundSize: "cover",
      }}
      className="w-screen h-screen min-h-screen flex"
    >
      <div className="w-1/2 h-full flex">
        <div className="text-left justify-items-start mx-auto my-auto flex flex-col gap-12 w-3/5">
          <h1 className="text-black text-4xl mt-8">DEPT_X EVENT</h1>
          <p className="text-xl">
            We will hold the Kanahei's live printing during the Hunger Run.
            Comel Design and create your own T-shirt or Tote bag with your
            favorite image. Let's go and have fun.
          </p>
          <table>
            <tr>
              <td>
                <span className="font-bold">Date:</span>
              </td>
              <td>{new Date().toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>
                <span className="font-bold">Location:</span>
              </td>
              <td>
                {"Tseung Kwan O Jockey Club HKFA Football Traning Centre"}
              </td>
            </tr>
            <tr>
              <td>
                <span className="font-bold">Time:</span>
              </td>
              <td>{new Date().toLocaleDateString()}</td>
            </tr>
          </table>
          <button className="bg-yellow-500 p-4 w-1/3 text-white font-bold rounded-full">
            REGISTER NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
