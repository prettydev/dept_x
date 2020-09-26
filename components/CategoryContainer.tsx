import React from 'react'
import { Product } from '../interfaces'
import { Heading } from '@chakra-ui/core'
import ProductList from './ProductList'

type Props = {
    name: string
    products: Product[]
}

const CategoryContainer = ({ name, products }: Props) => (
    <>
        <Heading padding={{ base: '1rem', lg: '2rem' }}>{name}</Heading>
        <ProductList items={products} />
    </>
)

export default CategoryContainer
