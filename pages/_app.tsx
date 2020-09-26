import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { ApolloProvider } from '@apollo/client'

import { AppProvider } from '../components/contexts/AppContext'
import apolloClient from '../utils/apolloClient'
import theme from '../components/UI/Theme'

import '../styles/global.css'

function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <ApolloProvider client={apolloClient}>
                <AppProvider>
                    <Component {...pageProps} />
                </AppProvider>
            </ApolloProvider>
        </ThemeProvider>
    )
}

export default App
