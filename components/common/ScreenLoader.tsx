import { Flex, Spinner } from '@chakra-ui/core'

const Loader = () => {
    return (
        <Flex
            position="fixed"
            top="0"
            left="0"
            height="100vh"
            width="100vw"
            backgroundColor="white"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="brand.purple"
                size="xl"
                marginBottom="1rem"
            />
            Please Wait...
        </Flex>
    )
}

export default Loader
