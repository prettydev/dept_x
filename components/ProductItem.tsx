import React from 'react'
import Link from 'next/link'

import { Product } from '../interfaces'
import { Flex, Image, Button, Heading, SimpleGrid } from '@chakra-ui/core'

type Props = {
    item: Product
}

const ProductItem = ({ item }: Props) => (
    <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        padding="2rem"
        bg="brand.pink"
        color="brand.black"
        fontFamily="Poppins, Arial, Helvetica, sans-serif"
    >
        <Image
            src={item.imageUrl}
            alt={item.name}
            fallbackSrc="/placeholderImg.png"
        />
        <Heading
            size="lg"
            marginY="0.5rem"
            fontFamily="inherit"
            fontWeight="800"
            color="brand.black"
        >
            {item.name}
        </Heading>
        {!item.salePrice ? (
            <Heading
                size="md"
                marginY="0.5rem"
                fontFamily="inherit"
                fontWeight="600"
            >
                {item.price}
            </Heading>
        ) : (
            <SimpleGrid marginY="0.5rem" columns={2} spacing={2}>
                <Heading as="s" size="md" fontFamily="inherit" fontWeight="600">
                    {item.price}
                </Heading>
                <Heading
                    size="md"
                    color="red.500"
                    fontFamily="inherit"
                    fontWeight="600"
                >
                    {item.salePrice}
                </Heading>
            </SimpleGrid>
        )}

        <Button backgroundColor="brand.purple" color="white" marginTop="0.5rem">
            <Link href="/products/[slug]" as={`/products/${item.slug}`}>
                <a>VIEW</a>
            </Link>
        </Button>
    </Flex>
)

export default ProductItem
