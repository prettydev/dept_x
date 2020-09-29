import React from "react";
import type { AppProps } from "next/app";

import "../styles/tailwind.scss";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
