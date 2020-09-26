import { gql } from '@apollo/client'
import apolloClient from '../utils/apolloClient'
import { Product, Category } from '../interfaces'

export async function getAllCategories() {
    const CATEGORIES_QUERY = gql`
        query Product {
            productCategories {
                nodes {
                    databaseId
                    name
                    slug
                    image {
                        sourceUrl
                    }
                    products {
                        nodes {
                            productId
                            name
                            slug
                            status
                            image {
                                sourceUrl
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
                    children {
                        nodes {
                            name
                            slug
                            databaseId
                        }
                    }
                    parent {
                        node {
                            id
                            name
                            slug
                            databaseId
                        }
                    }
                }
            }
        }
    `

    const results = await apolloClient.query({ query: CATEGORIES_QUERY })
    const data = results.data.productCategories.nodes
    let categories: Category[] = data.map((cat) => {
        const products: Product[] = cat.products.nodes.map((product) => {
            return {
                id: product.productId,
                slug: product.slug,
                name: product.name,
                imageUrl: product.image?.sourceUrl || null,
                price: product.regularPrice || null,
                salePrice: product.salePrice || null,
                status: product.stockStatus || null,
            }
        })

        const children: Category[] = cat.children.nodes.map((child) => ({
            id: child.databaseId,
            slug: child.slug,
            name: child.name,
        }))

        const parent: Category =
            (cat.parent && {
                id: cat.parent.node.databaseId,
                slug: cat.parent.node.slug,
                name: cat.parent.node.name,
            }) ||
            null

        return {
            id: cat.databaseId,
            name: cat.name,
            slug: cat.slug,
            imageUrl: cat.image?.sourceUrl || null,
            products: products,
            children: children,
            parent: parent,
        }
    })
    categories = categories.filter(
        (cat) =>
            cat.name.toLowerCase() !== 'uncategorized' &&
            cat.products.length > 0
    )

    return categories
}

export async function getAllCategorySlugs() {
    const CATEGORIES_ID_QUERY = gql`
        query {
            productCategories {
                nodes {
                    databaseId
                    id
                    slug
                }
            }
        }
    `
    const results = await apolloClient.query({ query: CATEGORIES_ID_QUERY })
    const data = results.data.productCategories.nodes
    const slugs: String[] = data.map((item) => item.slug.toString())
    return slugs
}

export async function getCategoryBySlug(slug: string) {
    const CATEGORY_BY_ID_QUERY = gql`
        query Category($id: ID!, $idType: ProductCategoryIdType) {
            productCategory(id: $id, idType: $idType) {
                databaseId
                slug
                name
                image {
                    sourceUrl
                }
                products {
                    nodes {
                        productId
                        name
                        slug
                        image {
                            sourceUrl
                        }
                        productCategories {
                            nodes {
                                databaseId
                                slug
                                name
                                parent {
                                    node {
                                        name
                                        slug
                                        databaseId
                                    }
                                }
                            }
                        }
                        ... on SimpleProduct {
                            salePrice
                            regularPrice
                            stockStatus
                        }
                    }
                }
                children {
                    nodes {
                        name
                        slug
                        databaseId
                    }
                }
                parent {
                    node {
                        id
                        name
                        slug
                        databaseId
                    }
                }
            }
        }
    `

    const results = await apolloClient.query({
        query: CATEGORY_BY_ID_QUERY,
        variables: { id: slug, idType: 'SLUG' },
    })
    const data = results.data.productCategory
    const products: Product[] = data.products.nodes.map((product) => {
        const categories = product.productCategories.nodes.map((cat) => {
            const parent: Category =
                (cat.parent && {
                    id: cat.parent.node.databaseId,
                    slug: cat.parent.node.slug,
                    name: cat.parent.node.name,
                }) ||
                null
            return {
                id: cat.databaseId,
                name: cat.name,
                slug: cat.slug,
                parent: parent,
            }
        })

        return {
            id: product.productId,
            slug: product.slug,
            name: product.name,
            categories: categories,
            imageUrl: product.image?.sourceUrl || null,
            price: product.regularPrice || null,
            salePrice: product.salePrice || null,
            status: product.stockStatus || null,
        }
    })

    const children: Category[] = data.children.nodes.map((child) => ({
        id: child.databaseId,
        slug: child.slug,
        name: child.name,
    }))

    const parent: Category =
        (data.parent && {
            id: data.parent.node.databaseId,
            slug: data.parent.node.slug,
            name: data.parent.node.name,
        }) ||
        null

    const item: Category = {
        id: data.databaseId,
        name: data.name,
        slug: data.slug,
        imageUrl: data.image?.sourceUrl || null,
        products: products,
        children: children,
        parent: parent,
    }

    return item
}
