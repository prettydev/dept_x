import { useEffect } from "react";
import NextLink from "next/link";
import { Flex, Link as ChakraLink, Image } from "@chakra-ui/core";

import CartIcon from "../cart/CartIcon";

const Header = () => {
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const sticky = navbar.offsetTop;

    const stickyNav = () => {
      const content = document.getElementById("main-content");
      if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
        content.classList.add("paddingTop");
      } else {
        navbar.classList.remove("sticky");
        content.classList.remove("paddingTop");
      }
    };

    window.onscroll = function () {
      stickyNav();
    };
  }, []);

  return (
    <header id="header">
      <Flex
        className="bg-black"
        id="navbar"
        align="center"
        justify={{ base: "space-between", xl: "space-around" }}
        paddingX={{ base: "1rem", md: "2rem" }}
        height="4rem"
      >
        <NextLink href="/" passHref>
          <ChakraLink _hover={{ cursor: "pointer" }}>
            <Image src="/logo.svg" alt="Digital Door Locks" maxHeight="4rem" />
          </ChakraLink>
        </NextLink>

        <CartIcon />
      </Flex>
    </header>
  );
};

export default Header;
