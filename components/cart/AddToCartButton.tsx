import { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { nanoid } from 'nanoid'
import { Button, useToast } from '@chakra-ui/core'

import { Product } from '../../interfaces'
import { AppContext } from '../contexts/AppContext'
import { ADD_TO_CART_MUTATION, getCart } from '../../lib/cart'
import { showError, showSuccess } from '../../utils/functions'

type Props = {
    product: Product
    quantity: number
}

const AddToCartButton = ({ product, quantity }: Props) => {
    const {
        state: { cart },
        dispatch,
        refetch,
        fetchLoading,
    } = useContext(AppContext)
    const toast = useToast()

    const productQryInput = {
        clientMutationId: nanoid(), // Generate a unique id.
        productId: product.id,
        quantity: quantity,
    }

    const [
        addToCart,
        {
            data: addToCartRes,
            loading: addToCartLoading,
            error: addToCartError,
        },
    ] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {
            input: productQryInput,
        },
        onCompleted: () => {
            if (addToCartError) {
                console.log(addToCartError)
                showError(toast, 'Unable to add item(s) to cart!')
                return
            }

            getCart(refetch, dispatch)
            showSuccess(toast, 'Item(s) added to cart!')
        },
        onError: (error) => {
            if (error) {
                console.log(error)
                showError(toast, 'Unable to add item(s) to cart!')
            }
        },
    })

    const handleAddToCart = () => {
        addToCart()
    }

    return (
        <Button
            color="white"
            backgroundColor="brand.purple"
            isLoading={addToCartLoading || fetchLoading}
            onClick={handleAddToCart}
        >
            ADD TO CART
        </Button>
    )
}

export default AddToCartButton
