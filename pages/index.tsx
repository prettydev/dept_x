import React, { useState } from "react";
import { Transition } from "@tailwindui/react";
import Drawer from "rc-drawer";
import Sticky from "react-stickynode";
import { AppProvider } from "../contexts/AppContext";
import Banner from "../containers/Banner";
import Events from "../containers/Events";
import Register from "../containers/Register";
import AboutUs from "../containers/AboutUs";

import ScrollSpyMenu from "../components/ScrollSpyMenu";
import { DrawerProvider } from "../contexts/DrawerContext";

import { Icon, InlineIcon } from "@iconify/react";
import menuSharp from "@iconify/icons-ion/menu-sharp";
import closeIcon from "@iconify/icons-ion/close";

// import "rc-drawer/assets/index.css";

const menuData = [
  {
    label: "HOME",
    path: "#banner",
    offset: "80",
  },
  {
    label: "ABOUT US",
    path: "#about",
    offset: "80",
  },
  {
    label: "ORDER INSTRUCTION",
    path: "#events",
    offset: "80",
  },
  {
    label: "REGISTER",
    path: "#register",
    offset: "80",
  },
];

const LandingPage = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="overflow-hidden flex flex-col min-h-screen overflow-x-hidden">
        <Banner key="banner" />
        <AboutUs key="about" />
        <Events key="events" />
        <Register key="register" />
      </div>
      <button
        className="fixed top-8 right-8 text-4xl z-10 text-gray-300 hover:text-white transition ease-in-out duration-150"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {isOpen ? <Icon icon={closeIcon} /> : <Icon icon={menuSharp} />}
      </button>
      <section className="absolute inset-y-0 right-0 max-w-full flex">
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div
              ref={ref}
              className="py-auto origin-top-right fixed right-0 w-80 min-h-screen rounded-md shadow-lg"
              style={{ backgroundColor: "#4B4B4B" }}
            >
              <ScrollSpyMenu
                className="mt-48 text-white ml-8"
                menuItems={menuData}
                drawerClose={true}
                offset={-100}
              />
            </div>
          )}
        </Transition>
      </section>
    </>
  );
};

export default LandingPage;
