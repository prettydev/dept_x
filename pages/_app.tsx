import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { ApolloProvider } from "@apollo/client";

import { AppProvider } from "../contexts/AppContext";
import apolloClient from "../utils/apolloClient";
import theme from "../components/UI/Theme";

import "../styles/index.css";
import "../styles/global.css";
import "../assets/css/flaticon.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
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

      <CSSReset />
      <ApolloProvider client={apolloClient}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
