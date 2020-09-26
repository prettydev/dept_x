import { gql } from '@apollo/client'
import { Cart, CartProduct, BillingInputs, ShippingInputs } from '../interfaces'
import { getFloatVal } from '../utils/functions'

export const getFormattedCart = (data) => {
    if (!data || !data.cart.contents.nodes.length) return null

    const products = data.cart.contents.nodes
    const cartProducts: CartProduct[] = []
    let totalCount = 0

    products.forEach(({ product, quantity, key }) => {
        totalCount += quantity

        const price = product.salePrice
            ? getFloatVal(product.salePrice)
            : getFloatVal(product.regularPrice)
        const p: CartProduct = {
            id: product.productId,
            cartKey: key,
            slug: product.slug,
            imageUrl: product.image.sourceUrl || null,
            name: product.name,
            price: price,
            quantity: quantity,
            subtotal: quantity * price,
        }
        cartProducts.push(p)
    })

    const cart: Cart = {
        products: cartProducts,
        totalCount: totalCount,
        totalPrice: getFloatVal(data.cart.total),
    }

    return cart
}

export const getCart = (refetch, dispatch) => {
    refetch().then((response) => {
        const updatedCart = getFormattedCart(response.data)
        dispatch({
            type: 'UPDATE_CART',
            payload: updatedCart,
        })
    })
}

/**
 * Get the updated items in the below format required for mutation input.
 *
 * [
 * { "key": "33e75ff09dd601bbe6dd51039152189", "quantity": 1 },
 * { "key": "02e74f10e0327ad868d38f2b4fdd6f0", "quantity": 1 },
 * ]
 *
 * Creates an array in above format with the newQty (updated Qty ).
 *
 */
export const getUpdatedItems = (products, newQty, cartKey) => {
    // Create an empty array.
    const updatedItems = []

    // Loop through the product array.
    products.map((cartItem) => {
        // If you find the cart key of the product user is trying to update, push the key and new qty.
        if (cartItem.cartKey === cartKey) {
            updatedItems.push({
                key: cartItem.cartKey,
                quantity: parseInt(newQty),
            })

            // Otherwise just push the existing qty without updating.
        } else {
            updatedItems.push({
                key: cartItem.cartKey,
                quantity: cartItem.quantity,
            })
        }
    })

    // Return the updatedItems array with new Qtys.
    return updatedItems
}

// format checkout data
export const createCheckoutData = (
    billingData: BillingInputs,
    shippingData: ShippingInputs,
    diffShpAddr: boolean
) => {
    const billing = {
        firstName: billingData.billingFirstName.value,
        lastName: billingData.billingLastName.value,
        address1: billingData.billingAddress1.value,
        address2: billingData.billingAddress2.value,
        city: billingData.billingSuburb.value,
        country: 'AU',
        state: billingData.billingState.value,
        postcode: billingData.billingPostcode.value,
        email: billingData.billingEmail.value,
        phone: billingData.billingPhone.value,
        company: billingData.billingCompany.value,
    }

    let shipping = {
        ...billing,
    }
    if (diffShpAddr) {
        shipping.firstName = shippingData.shippingFirstName.value
        shipping.lastName = shippingData.shippingLastName.value
        shipping.address1 = shippingData.shippingAddress1.value
        shipping.address2 = shippingData.shippingAddress2.value
        shipping.city = shippingData.shippingSuburb.value
        shipping.state = shippingData.shippingState.value
        shipping.postcode = shippingData.shippingPostcode.value
        shipping.company = shippingData.shippingCompany.value
    }

    const checkoutData = {
        billing,
        shipping,
        shipToDifferentAddress: diffShpAddr,
        isPaid: false,
    }

    return checkoutData
}

export const GET_CART_QUERY = gql`
    query GetCart {
        __typename
        cart {
            total
            contents {
                nodes {
                    key
                    quantity
                    product {
                        productId
                        slug
                        name
                        image {
                            sourceUrl
                        }
                        ... on SimpleProduct {
                            salePrice
                            regularPrice
                            stockStatus
                        }
                    }
                }
            }
        }
    }
`
export const ADD_TO_CART_MUTATION = gql`
    mutation($input: AddToCartInput!) {
        addToCart(input: $input) {
            cartItem {
                quantity
                total
                subtotal
                subtotalTax
                product {
                    productId
                    name
                    slug
                    image {
                        sourceUrl
                    }
                    ... on SimpleProduct {
                        salePrice
                        regularPrice
                        stockStatus
                    }
                }
            }
        }
    }
`
export const UPDATE_CART = gql`
    mutation($input: UpdateItemQuantitiesInput!) {
        updateItemQuantities(input: $input) {
            items {
                key
                product {
                    id
                    productId
                    name
                    slug
                    image {
                        sourceUrl
                        altText
                    }
                    ... on SimpleProduct {
                        salePrice
                        regularPrice
                        stockStatus
                    }
                }
                quantity
                total
                subtotal
                subtotalTax
            }
            removed {
                key
                product {
                    id
                    productId
                    ... on SimpleProduct {
                        salePrice
                        regularPrice
                        stockStatus
                    }
                }
            }
            updated {
                key
                product {
                    id
                    productId
                    ... on SimpleProduct {
                        salePrice
                        regularPrice
                        stockStatus
                    }
                }
            }
        }
    }
`

export const CLEAR_CART_MUTATION = gql`
    mutation CLEAR_CART_MUTATION($input: RemoveItemsFromCartInput!) {
        removeItemsFromCart(input: $input) {
            cartItems {
                quantity
            }
        }
    }
`

export const GET_PAYMENTS_QUERY = gql`
    query PaymentMethods {
        paymentGateways {
            nodes {
                description
                id
                title
                icon
            }
        }
    }
`

export const CHECKOUT_MUTATION = gql`
    mutation CHECKOUT_MUTATION($input: CheckoutInput!) {
        checkout(input: $input) {
            clientMutationId
            order {
                id
                orderId
                paymentMethod
                refunds {
                    nodes {
                        amount
                    }
                }
                status
            }
            result
            redirect
        }
    }
`
