import { useContext } from 'react'
import Link from 'next/link'
import { IconButton, Box } from '@chakra-ui/core'

import { AppContext } from '../contexts/AppContext'
import { GrCart } from 'react-icons/gr'

const CartIcon = (props) => {
    const {
        state: { cart },
    } = useContext(AppContext)

    const count = cart && Object.keys(cart).length > 0 ? cart.totalCount : 0

    return (
        <Box {...props}>
            <Link href="/cart">
                <a>
                    <IconButton
                        variant="ghost"
                        aria-label="cart"
                        icon={GrCart}
                        size="lg"
                    />
                    <Box
                        display="inline-block"
                        position="relative"
                        top="-0.5rem"
                        left="-1.5rem"
                        color="white"
                        backgroundColor="brand.purple"
                        borderRadius="50%"
                        width="1.5rem"
                        height="1.5rem"
                        textAlign="center"
                    >
                        {count}
                    </Box>
                </a>
            </Link>
        </Box>
    )
}

export default CartIcon
