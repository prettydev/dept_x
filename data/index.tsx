/* interiro dummy data list :-
- Navbar
- Banner
- Feature
- About
- Projects
- Team
- News
- Testimonial
- Gallery
- Newsletter
- Footer
  - menu widget
  - copyright
  - social links
*/
/* ------------------------------------ */
// Menu data
/* ------------------------------------ */
export const menuData = [
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

/* ------------------------------------ */
// Banner section data
/* ------------------------------------ */
const slide1 = require("../assets/image/slider/slide1.png");
const slide2 = require("../assets/image/slider/slide2.png");
const slide3 = require("../assets/image/slider/slide3.png");

export const bannerData = {
  discount: "25%",
  discountLabel: "DISCOUNT ON YOUR FIRST DESIGN",
  title: "We craft affordable design",
  text:
    "Your interior should still represent your style. No matter how large your space is or what your design preference is, these designer examples are designed to inspire you.",
  carousel: [
    {
      id: 1,
      thumb_url: slide1,
      title: "Restroom",
      link: "#1",
    },
    {
      id: 2,
      thumb_url: slide2,
      title: "Livingroom",
      link: "#1",
    },
    {
      id: 3,
      thumb_url: slide3,
      title: "Corner",
      link: "#1",
    },
  ],
};

/* ------------------------------------ */
// About section data
/* ------------------------------------ */
const parentImg = require("../assets/image/about_parent.png");

export const aboutData = {
  thumb_url: parentImg,
  title: "Hi, Meet <br> Concrete Squarefeet",
  text:
    "Your interior should still represent your style and feel like a place you want to unwind in. No matter how large your space is or what your design preference is, these designer examples are designed to inspire you. No matter what your choices are, customer satisfaction is our desired goal.",
  text2:
    "When considering the design of your bedroom, it’s important to keep in mind both aesthetics and functionality. If storage is a primary concern, it is important to integrate the right cupboards and wardrobes into your design.",
};

/* ------------------------------------ */
// social profile
/* ------------------------------------ */
export const socialProfile = [
  {
    id: 1,
    icon: "flaticon-facebook-logo",
    link: "#",
  },
  {
    id: 2,
    icon: "flaticon-twitter-logo-silhouette",
    link: "#",
  },
  {
    id: 3,
    icon: "flaticon-instagram",
    link: "#",
  },
  {
    id: 4,
    icon: "flaticon-tumblr-logo",
    link: "#",
  },
  {
    id: 5,
    icon: "flaticon-dribble-logo",
    link: "#",
  },
];
