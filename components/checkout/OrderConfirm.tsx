import Link from 'next/link'
import { Button, Heading } from '@chakra-ui/core'
import ScreenLoader from '../common/ScreenLoader'
import { useQuery } from '@apollo/client'
import { GET_ORDER_QUERY } from '../../lib/account'

const OrderConfirm = ({ orderKey, orderId }) => {
    const { data, loading, error } = useQuery(GET_ORDER_QUERY, {
        variables: {
            orderKey,
        },
        onError: (error) => {
            console.log(error)
        },
    })

    if (loading) return <ScreenLoader />

    if (error || !data || !data.hasOwnProperty('order'))
        return (
            <Heading size="lg" mb={{ base: '1rem', md: '2rem' }}>
                Unable to retrieve order!
            </Heading>
        )

    return (
        <>
            <Heading size="lg" mb={{ base: '1rem', md: '2rem' }}>
                Your Order Number: {orderId}
            </Heading>
            <Button color="white" backgroundColor="brand.purple">
                <Link href="/">
                    <a>Return To Store</a>
                </Link>
            </Button>
        </>
    )
}

export default OrderConfirm
