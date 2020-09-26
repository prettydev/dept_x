import { useContext } from 'react'
import {
    Box,
    Button,
    Flex,
    Text,
    Heading,
    SimpleGrid,
    useToast,
} from '@chakra-ui/core'
import CartItem from './CartItem'
import Link from 'next/link'

import { AppContext } from '../contexts/AppContext'
import { toAUD, showSuccess, showError } from '../../utils/functions'
import { useMutation } from '@apollo/client'
import { CLEAR_CART_MUTATION, getFormattedCart } from '../../lib/cart'
import { nanoid } from 'nanoid'

const CartContainer = () => {
    const {
        state: { cart },
        dispatch,
        refetch,
        fetchLoading,
    } = useContext(AppContext)
    const toast = useToast()

    // Clear cart Mutation.
    const [
        clearCart,
        {
            data: clearCartRes,
            loading: clearCartProcessing,
            error: clearCartError,
        },
    ] = useMutation(CLEAR_CART_MUTATION, {
        onCompleted: () => {
            refetch().then((response) => {
                const updatedCart = getFormattedCart(response.data)
                dispatch({
                    type: 'UPDATE_CART',
                    payload: updatedCart,
                })
            })
            showSuccess(toast, 'All items removed!')
        },
        onError: (error) => {
            // console.log(error)
            if (error) {
                showError(toast, 'Unable to clear cart!')
            }
        },
    })

    const handleClearCart = (event) => {
        event.stopPropagation()

        if (clearCartProcessing) {
            return
        }

        clearCart({
            variables: {
                input: {
                    clientMutationId: nanoid(),
                    all: true,
                },
            },
        })
    }

    if (!cart || Object.keys(cart).length === 0 || cart.products.length === 0) {
        return (
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Heading size="lg" marginBottom="2rem">
                    Your Cart Is Empty
                </Heading>
                <Button color="white" backgroundColor="brand.purple">
                    <Link href="/">
                        <a>Return To Store</a>
                    </Link>
                </Button>
            </Flex>
        )
    }
    return (
        <Box width="full">
            {cart.products.map((product) => (
                <CartItem
                    key={product.id}
                    product={product}
                    cart={cart}
                    setCart={dispatch}
                />
            ))}
            <Button
                marginBottom="1rem"
                isLoading={clearCartProcessing || fetchLoading}
                onClick={handleClearCart}
            >
                CLEAR CART
            </Button>
            <Heading size="lg" marginBottom="2rem">
                Cart Total
            </Heading>
            <SimpleGrid
                columns={2}
                width={{ base: '100%', md: '50%', lg: '25%' }}
                spacingY="1rem"
                marginBottom="2rem"
            >
                <Text>Subtotal</Text>
                <Text>{toAUD(cart.totalPrice)}</Text>
                <Text>Shipping</Text>
                <Text>FREE</Text>
                <Text>Total</Text>
                <Text color="brand.purple">{toAUD(cart.totalPrice)}</Text>
            </SimpleGrid>
            <Button color="white" backgroundColor="brand.purple">
                <Link href="/checkout">
                    <a>PROCEED TO CHECKOUT</a>
                </Link>
            </Button>
        </Box>
    )
}

export default CartContainer
