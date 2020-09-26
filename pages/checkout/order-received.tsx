import { useRouter } from 'next/router'
import Layout from '../../components/UI/Layout'
import { Box, Heading, Divider, Text } from '@chakra-ui/core'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../components/contexts/AppContext'
import { useMutation } from '@apollo/client'
import { CLEAR_CART_MUTATION, getCart } from '../../lib/cart'
import { nanoid } from 'nanoid'
import ScreenLoader from '../../components/common/ScreenLoader'
import OrderConfirm from '../../components/checkout/OrderConfirm'

const OrderPage = () => {
    const router = useRouter()
    const { dispatch, refetch } = useContext(AppContext)

    const [
        clearCart,
        {
            data: clearCartRes,
            loading: clearCartProcessing,
            error: clearCartError,
        },
    ] = useMutation(CLEAR_CART_MUTATION, {
        onCompleted: () => {
            if (clearCartError) {
                console.log(clearCartError)
            }
            getCart(refetch, dispatch)
            // console.log('manually cleared cart after checkout')
        },
        onError: (error) => {
            // console.log(error)
        },
    })

    useEffect(() => {
        clearCart({
            variables: {
                input: {
                    clientMutationId: nanoid(),
                    all: true,
                },
            },
        })
    }, [])

    const orderKey = router.query.key
    const orderId = router.query.order

    if (clearCartProcessing) return <ScreenLoader />

    return (
        <Layout title="Checkout Complete">
            <Box width="full" padding={{ base: '1rem', md: '2rem' }}>
                <Heading>Order Confirmation</Heading>
                <Divider marginY={{ base: '1rem', md: '2rem' }} />
                <OrderConfirm orderKey={orderKey} orderId={orderId} />
            </Box>
        </Layout>
    )
}

export default OrderPage
