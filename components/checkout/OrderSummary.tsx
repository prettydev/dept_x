import { Flex, Text, Heading, SimpleGrid } from '@chakra-ui/core'
import OrderItem from './OrderItem'

import { toAUD } from '../../utils/functions'
import { Cart } from '../../interfaces'

type Props = {
    cart: Cart
}

const OrderSummary = ({ cart }: Props) => {
    return (
        <Flex width="full" direction="column">
            <Heading
                size="lg"
                marginX={{ base: '1rem', md: '2rem' }}
                marginY="1rem"
                paddingY="1rem"
            >
                Your Order
            </Heading>
            {cart.products.map((product) => (
                <OrderItem key={product.id} product={product} />
            ))}

            <SimpleGrid
                alignSelf="flex-end"
                columns={2}
                width={{ base: '100%', md: '50%', lg: '25%' }}
                spacingY="1rem"
                marginBottom="2rem"
                paddingX="1rem"
            >
                <Text>Subtotal</Text>
                <Text>{toAUD(cart.totalPrice)}</Text>
                <Text>Shipping</Text>
                <Text>FREE</Text>
                <Text>Total</Text>
                <Text color="brand.purple">{toAUD(cart.totalPrice)}</Text>
            </SimpleGrid>
        </Flex>
    )
}

export default OrderSummary
