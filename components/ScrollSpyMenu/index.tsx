import React, { useContext } from "react";
import Scrollspy from "react-scrollspy";
import AnchorLink from "react-anchor-link-smooth-scroll";

import { AppContext } from "../../contexts/AppContext";

const ScrollSpyMenu = ({ className, menuItems, drawerClose, ...props }) => {
  const { dispatch } = useContext(AppContext);
  // empty array for scrollspy items
  const scrollItems = [];

  // convert menu path to scrollspy items
  menuItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  // Add all classs to an array
  const addAllClasses = ["scrollspy__menu"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  // Close drawer when click on menu item
  const toggleDrawer = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  return (
    <Scrollspy
      items={scrollItems}
      className={addAllClasses.join(" ")}
      componentTag="ul"
      currentClassName="is-current"
      // drawerClose={drawerClose}
      {...props}
    >
      {menuItems.map((menu, index) => (
        <li key={`menu-item-${index}`}>
          {menu.staticLink ? (
            <a href={menu.path}>{menu.label}</a>
          ) : (
            <>
              {drawerClose ? (
                <AnchorLink
                  href={menu.path}
                  offset={menu.offset}
                  onClick={toggleDrawer}
                >
                  {menu.label}
                </AnchorLink>
              ) : (
                <AnchorLink href={menu.path} offset={menu.offset}>
                  {menu.label}
                </AnchorLink>
              )}
            </>
          )}
        </li>
      ))}
    </Scrollspy>
  );
};

export default ScrollSpyMenu;
