import Link from 'next/link'
import { Box, IconButton, Image, Flex, Text, useToast } from '@chakra-ui/core'
import { AiFillCloseCircle } from 'react-icons/ai'
import { GrAdd, GrSubtract } from 'react-icons/gr'

import { CartProduct, Cart } from '../../interfaces'
import { UPDATE_CART, getUpdatedItems, getCart } from '../../lib/cart'
import {
    toAUD,
    showError,
    showSuccess,
    showWarning,
} from '../../utils/functions'
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { useMutation } from '@apollo/client'
import { nanoid } from 'nanoid'

type Props = {
    product: CartProduct
    cart: Cart
    setCart: Function
}

const CartItem = ({ product }: Props) => {
    const {
        state: { cart },
        dispatch,
        refetch,
        fetchLoading,
    } = useContext(AppContext)
    const toast = useToast()

    const [
        updateCart,
        {
            data: updateCartResponse,
            loading: updateCartProcessing,
            error: updateCartError,
        },
    ] = useMutation(UPDATE_CART, {
        onCompleted: () => {
            if (updateCartError) {
                console.log(updateCartError)
                showError(toast, 'Unable to update cart!')
            }

            getCart(refetch, dispatch)
            showSuccess(toast, 'Cart updated!')
        },
        onError: (error) => {
            if (error) {
                console.log(error)
                showError(toast, 'Unable to update cart!')
            }
        },
    })
    const handleIncrease = () => {
        if (process.browser) {
            // If the previous update cart mutation request is still processing, then return.
            if (updateCartProcessing) {
                return
            }

            // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
            const newQty = product.quantity + 1

            const updatedItems = getUpdatedItems(
                cart.products,
                newQty,
                product.cartKey
            )

            updateCart({
                variables: {
                    input: {
                        clientMutationId: nanoid(),
                        items: updatedItems,
                    },
                },
            })
        }
    }

    const handleDecrease = () => {
        if (process.browser) {
            // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
            if (updateCartProcessing) {
                return
            }

            if (product.quantity <= 1) {
                showWarning(toast, "Please click 'X' button to remove item")
                return
            }

            const newQty = product.quantity - 1

            const updatedItems = getUpdatedItems(
                cart.products,
                newQty,
                product.cartKey
            )

            updateCart({
                variables: {
                    input: {
                        clientMutationId: nanoid(),
                        items: updatedItems,
                    },
                },
            })
        }
    }

    const handleRemove = () => {
        if (process.browser) {
            if (updateCartProcessing) {
                return
            }

            // pass quantity of 0 to remove item
            const updatedItems = getUpdatedItems(
                cart.products,
                0,
                product.cartKey
            )

            updateCart({
                variables: {
                    input: {
                        clientMutationId: nanoid(),
                        items: updatedItems,
                    },
                },
            })
        }
    }

    return (
        <Box
            display={{ base: 'flex', md: 'grid' }}
            /* grid */
            gridTemplateColumns="1.5fr 1.5fr 1fr 1fr 1fr"
            justifyItems="center"
            /* flex */
            flexDirection="column"
            /* general */
            borderBottomColor="brand.lightgray"
            borderBottomWidth="1px"
            marginY={{ base: '1rem', md: '2rem' }}
            paddingY="1rem"
            justifyContent="space-around"
            alignItems="center"
        >
            <Flex
                flexDirection={{ base: 'row-reverse', md: 'row' }}
                width="100%"
                justifyContent="space-around"
                alignItems="center"
                marginBottom={{ base: '1rem', md: 0 }}
            >
                <IconButton
                    variant="ghost"
                    aria-label="remove-item"
                    icon={AiFillCloseCircle}
                    onClick={handleRemove}
                />
                <Image
                    maxHeight="5rem"
                    src={product.imageUrl}
                    alt={product.name}
                    fallbackSrc="/placeholderImg.png"
                />
            </Flex>
            <Link href="/products/[slug]" as={`/products/${product.slug}`}>
                <a>
                    <Text
                        color="brand.purple"
                        marginBottom={{ base: '1rem', md: 0 }}
                    >
                        {product.name}
                    </Text>
                </a>
            </Link>
            <Text marginBottom={{ base: '1rem', md: 0 }}>
                {toAUD(product.price)}
            </Text>
            <Flex
                width="100%"
                justifyContent="center"
                marginBottom={{ base: '1rem', md: 0 }}
            >
                <IconButton
                    isLoading={updateCartProcessing || fetchLoading}
                    variant="outline"
                    isRound
                    aria-label="subtract"
                    icon={GrSubtract}
                    size="sm"
                    onClick={handleDecrease}
                />
                <Text marginX="1rem">{product.quantity}</Text>
                <IconButton
                    isLoading={updateCartProcessing || fetchLoading}
                    variant="outline"
                    isRound
                    aria-label="add"
                    icon={GrAdd}
                    size="sm"
                    onClick={handleIncrease}
                />
            </Flex>
            <Text color="brand.orange">{toAUD(product.subtotal)}</Text>
        </Box>
    )
}

export default CartItem
