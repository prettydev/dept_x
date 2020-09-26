import React from 'react'
import ProductItem from './ProductItem'
import { Product } from '../interfaces'
import { SimpleGrid } from '@chakra-ui/core'

type Props = {
    items: Product[]
}

const ProductList = ({ items }: Props) => (
    <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 4 }}
        spacing="20px"
        padding={{ base: '1rem 1rem', lg: '1rem 2rem' }}
    >
        {items.map((item) => (
            <ProductItem item={item} key={item.id} />
        ))}
    </SimpleGrid>
)

export default ProductList
