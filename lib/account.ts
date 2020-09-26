import { gql } from '@apollo/client'
import apolloClient from '../utils/apolloClient'

export const GET_ORDER_QUERY = gql`
    query Order($orderKey: String) {
        order(orderKey: $orderKey) {
            date
            status
        }
    }
`
// query Order($orderKey: String!, $idType: OrderIdTypeEnum) {
//     order(orderKey: $orderKey, idType: $idType) {
//         orderId
//         date
//     }
// }

//   query Order($orderKey: String) {
//     order(orderKey: $orderKey) {
//         date
//     }
// }

// query Order($id: ID!, $idType: OrderIdTypeEnum) {
//     order(idType: $idType, id: $id) {
//         orderId
//         date
//     }
// }

export const getOrderIdByKey = async (key: string) => {
    const results = await apolloClient.query({
        query: GET_ORDER_QUERY,
        variables: { id: 60, idType: 'DATABASE_ID' },
    })
    console.log(results)
    const data = results.data
    const orderId = data.order.orderId
    return orderId
}
