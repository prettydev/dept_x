import React, { useState } from 'react'
// import ImageGallery from 'react-image-gallery'
import {
    Flex,
    Heading,
    Text,
    Divider,
    SimpleGrid,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    Stack,
    Image,
} from '@chakra-ui/core'

import AddToCartButton from './cart/AddToCartButton'
import { Product } from '../interfaces'
import { PRODUCT_STATUS } from '../utils/constants'

type Props = {
    product: Product
    images: string[]
}

const renderPrice = (product: Product, quantity, handleChange) => {
    let sale
    if (product.price) {
        sale = !product.salePrice ? (
            <Heading size="md" marginY="0.5rem" fontFamily="inherit">
                {product.price}
            </Heading>
        ) : (
            <Flex marginY="0.5rem">
                <Heading as="s" size="md">
                    {product.price}
                </Heading>
                &nbsp;
                <Heading size="md" color="red.500">
                    {product.salePrice}
                </Heading>
            </Flex>
        )
    }

    let status = ''
    switch (product.status) {
        case PRODUCT_STATUS.IN_STOCK:
            status = 'In Stock'
            break
        case PRODUCT_STATUS.OUT_OF_STOCK:
            status = 'Out Of Stock'
            break
        case PRODUCT_STATUS.ON_BACKORDER:
            status = 'Available On Backorder'
            break

        default:
            break
    }

    const cartButton =
        product.status !== PRODUCT_STATUS.OUT_OF_STOCK && product.price ? (
            <SimpleGrid columns={2} spacing="2rem" marginY="0.5rem">
                <NumberInput
                    value={quantity}
                    defaultValue={1}
                    min={1}
                    onChange={handleChange}
                >
                    <NumberInputField textAlign="center" />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <AddToCartButton product={product} quantity={quantity} />
            </SimpleGrid>
        ) : (
            ''
        )
    return (
        <Stack spacing={{ base: '1rem', md: '1.5rem' }}>
            {sale}
            <Text>{status}</Text>
            {cartButton}
        </Stack>
    )
}

const ProductDetail = ({ product, images }: Props) => {
    const [quantity, setQuantity] = useState(1)

    const handleChange = (value) => {
        setQuantity(value)
    }

    // const imagesGallery = images
    //     ? images.map((img) => ({
    //           original: img,
    //           thumbnail: img,
    //           originalAlt: '/placeholderImg.png',
    //           thumbnailAlt: '/placeholderImg.png',
    //       }))
    //     : [
    //           {
    //               original: product.imageUrl,
    //               thumbnail: product.imageUrl,
    //               originalAlt: '/placeholderImg.png',
    //               thumbnailAlt: '/placeholderImg.png',
    //           },
    //       ]

    return (
        <SimpleGrid
            columns={{ base: 1, md: 2 }}
            justifyContent="center"
            padding="2rem 2rem"
            spacing="2rem"
            color="brand.black"
        >
            <Flex justify="center">
                <Image
                    src={product.imageUrl}
                    fallbackSrc="/placeholderImg.png"
                />
            </Flex>
            <Stack spacing={{ base: '1rem', md: '1.5rem' }}>
                <Heading
                    size="lg"
                    color="brand.purple"
                    marginY="0.5rem"
                    fontFamily="Poppins, Arial, Helvetica, sans-serif"
                >
                    {product.name}
                </Heading>
                {renderPrice(product, quantity, handleChange)}
                <Divider marginTop="1rem" />
                <Box
                    marginTop="0.5rem"
                    dangerouslySetInnerHTML={{
                        __html: product.shortDescription,
                    }}
                ></Box>
            </Stack>
        </SimpleGrid>
    )
}

export default ProductDetail
