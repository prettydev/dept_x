import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/index.css";
import "../styles/global.css";
import "../assets/css/flaticon.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="DEPT_X"
          content="React, React js, Next, Next js, Gatsby, Gatsby Js, Fast Landing, Modren Landing"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:500,600&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
          rel="stylesheet"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default App;
