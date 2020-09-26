import { gql } from '@apollo/client'
import apolloClient from '../utils/apolloClient'
import { Product } from '../interfaces'

export async function getAllProducts() {
    const PRODUCTS_QUERY = gql`
        query {
            products {
                nodes {
                    productId
                    id
                    averageRating
                    slug
                    name
                    description
                    image {
                        uri
                        sourceUrl
                        srcSet
                        title
                    }
                    ... on SimpleProduct {
                        regularPrice
                        salePrice
                    }
                    ... on VariableProduct {
                        regularPrice
                        salePrice
                    }
                    ... on ExternalProduct {
                        regularPrice
                        salePrice
                    }
                }
            }
        }
    `

    const results = await apolloClient.query({ query: PRODUCTS_QUERY })
    const data = results.data.products.nodes
    // console.log(data)
    const items: Product[] = data.map((item) => ({
        id: item.productId,
        name: item.name,
        slug: item.slug,
        price: item.regularPrice || null,
        description: item.description,
        imageUrl: item.image.sourceUrl,
        salePrice: item.salePrice || null,
    }))
    return items
}

export async function getAllProductSlugs() {
    const PRODUCTS_ID_QUERY = gql`
        query {
            products {
                nodes {
                    productId
                    id
                    slug
                }
            }
        }
    `
    const results = await apolloClient.query({ query: PRODUCTS_ID_QUERY })
    const data = results.data.products.nodes
    // console.log(data)
    const slugs: String[] = data.map((item) => item.slug.toString())
    return slugs
}

export async function getProductById(id: string) {
    const PRODUCT_BY_ID_QUERY = gql`
        query Product($id: ID!, $idType: ProductIdTypeEnum) {
            product(id: $id, idType: $idType) {
                productId
                averageRating
                description
                slug
                name
                image {
                    title
                    sourceUrl
                    srcSet
                }
                productCategories {
                    nodes {
                        databaseId
                        slug
                        name
                    }
                }
                ... on SimpleProduct {
                    salePrice
                    regularPrice
                    stockStatus
                }
            }
        }
    `

    const results = await apolloClient.query({
        query: PRODUCT_BY_ID_QUERY,
        variables: { id, idType: 'DATABASE_ID' },
    })
    const data = results.data.product
    // console.log(data)

    const categories = data.productCategories.nodes.map((cat) => ({
        id: cat.databaseId,
        name: cat.name,
        slug: cat.slug,
    }))

    const item: Product = {
        id: data.productId,
        name: data.name,
        slug: data.slug,
        categories: categories,
        description: data.description,
        price: data.regularPrice || null,
        salePrice: data.salePrice || null,
        imageUrl: data.image.sourceUrl,
    }
    return item
}

export async function getProductBySlug(slug: string) {
    const PRODUCT_BY_ID_QUERY = gql`
        query Product($id: ID!, $idType: ProductIdTypeEnum) {
            product(id: $id, idType: $idType) {
                id
                productId
                averageRating
                description
                shortDescription
                slug
                name
                image {
                    uri
                    title
                    sourceUrl
                    srcSet
                }
                galleryImages {
                    nodes {
                        sourceUrl
                        altText
                    }
                }
                productCategories {
                    nodes {
                        databaseId
                        slug
                        name
                    }
                }
                ... on SimpleProduct {
                    salePrice
                    regularPrice
                    stockStatus
                }
            }
        }
    `

    const results = await apolloClient.query({
        query: PRODUCT_BY_ID_QUERY,
        variables: { id: slug, idType: 'SLUG' },
    })
    const data = results.data.product
    // console.log(data)
    const categories = data.productCategories.nodes.map((cat) => ({
        id: cat.databaseId,
        name: cat.name,
        slug: cat.slug,
    }))

    const galleryImages = data.galleryImages.nodes.map((img) => img.sourceUrl)

    const item: Product = {
        id: data.productId,
        name: data.name,
        slug: data.slug,
        categories: categories,
        shortDescription: data.shortDescription,
        description: data.description,
        price: data.regularPrice || null,
        salePrice: data.salePrice || null,
        imageUrl: data.image?.sourceUrl || null,
        gallery: galleryImages.length ? galleryImages : null,
        status: data.stockStatus || null,
    }
    return item
}
