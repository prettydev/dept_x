export type Product = {
    id: number
    name: string
    slug: string
    categories: Category[]
    price?: string
    shortDescription?: string
    description?: string
    imageUrl?: string
    gallery?: string[]
    salePrice?: string
    status?: string
}

export type Category = {
    id: number
    slug: string
    name: string
    imageUrl?: string
    parent?: Category
    children?: Category[]
    products?: Product[]
}

export type CartProduct = {
    id: number
    cartKey: string
    slug: string
    imageUrl: string
    name: string
    price: number
    quantity: number
    subtotal: number
}

export interface Cart {
    products: CartProduct[]
    totalCount: number
    totalPrice: number
}

/* CHECKOUT FORM */

type Input = {
    displayName: string
    name: string
    value: string
    error: string
}

export type BillingInputs = {
    billingFirstName: Input
    billingLastName: Input
    billingCompany: Input
    billingAddress1: Input
    billingAddress2: Input
    billingSuburb: Input
    billingState: Input
    billingPostcode: Input
    billingPhone: Input
    billingEmail: Input
}

export type ShippingInputs = {
    shippingFirstName: Input
    shippingLastName: Input
    shippingCompany: Input
    shippingAddress1: Input
    shippingAddress2: Input
    shippingSuburb: Input
    shippingState: Input
    shippingPostcode: Input
}
