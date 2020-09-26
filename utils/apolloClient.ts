import fetch from 'node-fetch'

import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    createHttpLink,
} from '@apollo/client'
import { WOO, WORDPRESS_URL } from '../utils/constants'

const graphqlUrl = WORDPRESS_URL + '/graphql'

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const middleware = new ApolloLink((operation, forward) => {
    /**
     * If session data exist in local storage, set value as session header.
     */
    const session = process.browser
        ? localStorage.getItem(WOO.SESSION_KEY)
        : null

    if (session) {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                [WOO.HEADER_KEY]: `Session ${session}`,
            },
        }))
    }

    return forward(operation)
})

/**
 * Afterware operation.
 *
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const afterware = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        /**
         * Check for session header and update session in local storage accordingly.
         */
        const context = operation.getContext()
        const {
            response: { headers },
        } = context
        const session = headers.get(WOO.HEADER_KEY)

        if (session) {
            // Remove session data if session destroyed.
            // if (!session) {
            //     localStorage.removeItem(WOO.SESSION_KEY)

            // Update new session data if changed.
            // } else if (localStorage.getItem(WOO.SESSION_KEY) !== session) {

            const localSession = localStorage.getItem(WOO.SESSION_KEY)
            if (localSession !== session) {
                localStorage.setItem(WOO.SESSION_KEY, session)
            }
        }
        return response
    })
})

const client = new ApolloClient({
    link: middleware.concat(
        afterware.concat(
            createHttpLink({
                uri: graphqlUrl,
                fetch: fetch,
            })
        )
    ),
    cache: new InMemoryCache(),
})
export default client
