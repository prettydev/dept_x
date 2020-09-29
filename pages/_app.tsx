import React from "react";
import type { AppProps } from "next/app";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../styles/tailwind.scss";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
