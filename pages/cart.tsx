import Layout from '../components/UI/Layout'
import CartContainer from '../components/cart/CartContainer'
import { Heading, Box, Divider } from '@chakra-ui/core'

export default function Cart() {
    return (
        <Layout title="Shopping Cart | Woo Next">
            <Box width="full" padding="2rem" color="brand.black">
                <Heading>Shopping Cart</Heading>
                <Divider marginY={{ base: '1rem', md: '2rem' }} />
                <CartContainer />
            </Box>
        </Layout>
    )
}
