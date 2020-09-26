import { Image, Text, Grid } from '@chakra-ui/core'

import { CartProduct } from '../../interfaces'
import { toAUD } from '../../utils/functions'

type Props = {
    product: CartProduct
}

const OrderItem = ({ product }: Props) => {
    return (
        <Grid
            gridTemplateColumns="1fr 2fr 1fr"
            justifyItems="center"
            alignItems="center"
            flexDirection="column"
            borderBottomColor="brand.pink"
            borderBottomWidth="1px"
            marginBottom="1rem"
            paddingBottom="1rem"
        >
            <Image
                maxHeight="5rem"
                src={product.imageUrl}
                alt={product.name}
                fallbackSrc="/placeholderImg.png"
            />

            <Text>
                {product.name} <Text as="b">x {product.quantity}</Text>
            </Text>

            <Text color="brand.orange">{toAUD(product.subtotal)}</Text>
        </Grid>
    )
}

export default OrderItem
