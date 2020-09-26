import { createContext, useReducer } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_CART_QUERY, getFormattedCart } from '../../lib/cart'
import { Cart } from '../../interfaces'
import ScreenLoader from '../common/ScreenLoader'

type ContextProps = {
    dispatch: any
    refetch: any
    fetchLoading: boolean
    state: {
        cart: Cart
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CART':
            return {
                ...state,
                cart: {
                    products: [],
                    totalCount: 0,
                    totalPrice: 0.0,
                    ...action.payload,
                },
            }
        default:
            return state
    }
}

export const AppContext = createContext<ContextProps>(null)

export const AppProvider = ({ children }) => {
    const initialCart: Cart = { products: [], totalCount: 0, totalPrice: 0.0 }
    const [state, dispatch] = useReducer(reducer, { cart: initialCart })

    const { data, refetch, loading } = useQuery(GET_CART_QUERY, {
        onCompleted: () => {
            const updatedCart = getFormattedCart(data)
            if (updatedCart) {
                dispatch({
                    type: 'UPDATE_CART',
                    payload: updatedCart,
                })
            }
        },
    })

    if (loading) {
        return <ScreenLoader />
    }

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch: dispatch,
                refetch: refetch,
                fetchLoading: loading,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
