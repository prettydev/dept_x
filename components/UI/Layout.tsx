import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Grid, Box } from '@chakra-ui/core'

import Header from './Header'
import Footer from './Footer'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'Woo Next' }: Props) => (
    <>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/icon.png"></link>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <meta
                name="robots"
                content="noimageindex, nofollow, nosnippet, noarchive, nosnippet"
            />
        </Head>

        <Grid
            height="100vh"
            templateRows="fit-content(7rem) auto fit-content(8rem)"
            templateAreas="'header' 'main' 'footer'"
        >
            <Header />
            <Box
                id="main-content"
                gridArea="main"
                color="brand.black"
                width={{ base: '100%', xl: '80rem' }}
                marginX={{ base: 0, xl: 'auto' }}
            >
                <main>{children}</main>
            </Box>
            <Footer />
        </Grid>
    </>
)

export default Layout
