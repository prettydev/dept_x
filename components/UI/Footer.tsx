import { Flex } from '@chakra-ui/core'

const Footer = () => {
    return (
        <footer id="footer">
            <Flex
                padding="1rem 1rem"
                justify="center"
                align="center"
                textAlign="center"
                backgroundColor="brand.purple"
                color="white"
                fontSize="0.8rem"
            >
                WooCommerce + Next.JS Demo
            </Flex>
        </footer>
    )
}

export default Footer
