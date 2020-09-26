import { useState, useContext, useEffect } from 'react'
import NextLink from 'next/link'
import { useQuery, useMutation } from '@apollo/client'
import {
    Flex,
    SimpleGrid,
    Switch,
    FormLabel,
    Box,
    Heading,
    Textarea,
    FormControl,
    RadioGroup,
    Radio,
    Text,
    Checkbox,
    Button,
    useToast,
} from '@chakra-ui/core'
import { nanoid } from 'nanoid'
import parse from 'url-parse'

import isEmail from 'validator/lib/isEmail'
import isPostalCode from 'validator/lib/isPostalCode'

import BillingForm from './form/BillingForm'
import ShippingForm from './form/ShippingForm'
import OrderSummary from './OrderSummary'
import { AppContext } from '../contexts/AppContext'
import { brand } from '../UI/Theme'
import {
    GET_PAYMENTS_QUERY,
    CHECKOUT_MUTATION,
    createCheckoutData,
    getCart,
} from '../../lib/cart'
import { showWarning, showError } from '../../utils/functions'

type Payment = {
    id: string
    title: string
    description: string
}

const CheckoutContainer = () => {
    const initialBillingInputs = {
        billingFirstName: {
            displayName: 'First Name',
            name: 'billingFirstName',
            value: '',
            error: '',
        },
        billingLastName: {
            displayName: 'Last Name',
            name: 'billingLastName',
            value: '',
            error: '',
        },
        billingCompany: {
            displayName: 'Company',
            name: 'billingCompany',
            value: '',
            error: '',
        },
        billingAddress1: {
            displayName: 'Street Address',
            name: 'billingAddress1',
            value: '',
            error: '',
        },
        billingAddress2: {
            displayName: 'Unit',
            name: 'billingAddress2',
            value: '',
            error: '',
        },
        billingSuburb: {
            displayName: 'Suburb',
            name: 'billingSuburb',
            value: '',
            error: '',
        },
        billingState: {
            displayName: 'State',
            name: 'billingState',
            value: '',
            error: '',
        },
        billingPostcode: {
            displayName: 'Postcode',
            name: 'billingPostcode',
            value: '',
            error: '',
        },
        billingPhone: {
            displayName: 'Phone',
            name: 'billingPhone',
            value: '',
            error: '',
        },
        billingEmail: {
            displayName: 'Email',
            name: 'billingEmail',
            value: '',
            error: '',
        },
    }

    // const initialBillingInputs = {
    //     billingFirstName: {
    //         displayName: 'First Name',
    //         name: 'billingFirstName',
    //         value: 'fname',
    //         error: '',
    //     },
    //     billingLastName: {
    //         displayName: 'Last Name',
    //         name: 'billingLastName',
    //         value: 'lname',
    //         error: '',
    //     },
    //     billingCompany: {
    //         displayName: 'Company',
    //         name: 'billingCompany',
    //         value: '',
    //         error: '',
    //     },
    //     billingAddress1: {
    //         displayName: 'Street Address',
    //         name: 'billingAddress1',
    //         value: '1 name st',
    //         error: '',
    //     },
    //     billingAddress2: {
    //         displayName: 'Unit',
    //         name: 'billingAddress2',
    //         value: '',
    //         error: '',
    //     },
    //     billingSuburb: {
    //         displayName: 'Suburb',
    //         name: 'billingSuburb',
    //         value: 'abc',
    //         error: '',
    //     },
    //     billingState: {
    //         displayName: 'State',
    //         name: 'billingState',
    //         value: 'Victoria',
    //         error: '',
    //     },
    //     billingPostcode: {
    //         displayName: 'Postcode',
    //         name: 'billingPostcode',
    //         value: '3000',
    //         error: '',
    //     },
    //     billingPhone: {
    //         displayName: 'Phone',
    //         name: 'billingPhone',
    //         value: '123456',
    //         error: '',
    //     },
    //     billingEmail: {
    //         displayName: 'Email',
    //         name: 'billingEmail',
    //         value: 'sb-cjt9472799337@personal.example.com',
    //         error: '',
    //     },
    // }

    const initialShippingInputs = {
        shippingFirstName: {
            displayName: 'First Name',
            name: 'shippingFirstName',
            value: '',
            error: '',
        },
        shippingLastName: {
            displayName: 'Last Name',
            name: 'shippingLastName',
            value: '',
            error: '',
        },
        shippingCompany: {
            displayName: 'Company',
            name: 'shippingCompany',
            value: '',
            error: '',
        },
        shippingAddress1: {
            displayName: 'Street Address',
            name: 'shippingAddress1',
            value: '',
            error: '',
        },
        shippingAddress2: {
            displayName: 'Unit',
            name: 'shippingAddress2',
            value: '',
            error: '',
        },
        shippingSuburb: {
            displayName: 'Suburb',
            name: 'shippingSuburb',
            value: '',
            error: '',
        },
        shippingState: {
            displayName: 'State',
            name: 'shippingState',
            value: '',
            error: '',
        },
        shippingPostcode: {
            displayName: 'Postcode',
            name: 'shippingPostcode',
            value: '',
            error: '',
        },
    }

    const toast = useToast()
    const [diffShpAddr, setDiffShpAddr] = useState(false)
    const [agree, setAgree] = useState(false)
    const [billingInputs, setBillingInputs] = useState(initialBillingInputs)
    const [shippingInputs, setShippingInputs] = useState(initialShippingInputs)
    const [orderNotes, setOrderNotes] = useState('')
    const [checkoutData, setCheckoutData] = useState(null)

    const availablePaymentGateways: Payment[] = []
    const [payments, setPayments] = useState(availablePaymentGateways)

    const [selectedPayment, setSelectedPayment] = useState('paypal')

    const {
        state: { cart },
        dispatch,
        refetch,
        fetchLoading,
    } = useContext(AppContext)

    const { data } = useQuery(GET_PAYMENTS_QUERY, {
        onCompleted: () => {
            let retrievedPayments = data.paymentGateways.nodes

            const availablePayments = retrievedPayments.map((p) => {
                const { id, title, description } = p
                const payment: Payment = { id, title, description }
                return payment
            })
            setPayments(availablePayments)
        },
    })

    const [
        checkout,
        {
            data: checkoutResponse,
            loading: checkoutLoading,
            error: checkoutError,
        },
    ] = useMutation(CHECKOUT_MUTATION, {
        onCompleted: (response) => {
            setCheckoutData(response)
            getCart(refetch, dispatch)
        },
        onError: (error) => {
            if (error) {
                console.log(error)
                showError(toast, 'An error occurred - Please try again!')
            }
        },
    })

    const handleSwitch = (e) => {
        setDiffShpAddr((showShippingAddr) => !showShippingAddr)
    }

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value)
        console.log(e.target.value)
    }

    const handleAgreeTerms = (e) => {
        setAgree((agree) => !agree)
    }

    const validate = (
        inputName: string,
        inputValue: string,
        inputDisplay: string
    ) => {
        const input = inputName.toLowerCase()
        const value = inputValue.trim()

        const requiredFields = [
            'firstname',
            'lastname',
            'address1',
            'phone',
            'email',
            'suburb',
            'postcode',
        ]

        if (requiredFields.find((field) => input.includes(field)) && !value) {
            return `${inputDisplay} is required`
        }

        if (input.includes('email') && !isEmail(value)) {
            return 'Please enter a valid email'
        }

        if (input.includes('postcode') && !isPostalCode(value, 'AU')) {
            return 'Please enter a valid postcode'
        }
    }

    const validateAll = (inputs, isBilling = true) => {
        let isValid = true

        const newInputs = { ...inputs }
        const keys = Object.keys(newInputs)

        keys.forEach((key) => {
            const input = newInputs[key]
            const { displayName, name, value } = input
            const err = validate(name, value, displayName)
            if (err) {
                newInputs[name].error = err
                isValid = false
            }
        })

        if (!isValid) {
            isBilling
                ? setBillingInputs(newInputs)
                : setShippingInputs(newInputs)
        }

        return isValid
    }

    const handleNotesChange = (event) => {
        setOrderNotes(event.target.value)
    }

    const handleBillingChange = (event) => {
        const name = event.target.id
        const value = event.target.value
        const { displayName } = billingInputs[name]
        const error = validate(name, value, displayName)
        const newInputs = {
            ...billingInputs,
            [name]: { displayName, name, value, error },
        }
        setBillingInputs(newInputs)
    }

    const handleShippingChange = (event) => {
        const name = event.target.id
        const value = event.target.value
        const { displayName } = shippingInputs[name]
        const error = validate(name, value, displayName)
        const newInputs = {
            ...shippingInputs,
            [name]: { displayName, name, value, error },
        }
        setShippingInputs(newInputs)
    }

    const handleFormSubmit = () => {
        if (
            (diffShpAddr && !validateAll(shippingInputs, false)) ||
            !validateAll(billingInputs)
        ) {
            showWarning(toast, 'Please fix the error(s)!')
            return
        }
        if (!agree) {
            showWarning(toast, 'You must agree to the terms and conditions!')
            return
        }

        console.log('passed')

        const checkoutData = createCheckoutData(
            billingInputs,
            shippingInputs,
            diffShpAddr
        )
        checkout({
            variables: {
                input: {
                    clientMutationId: nanoid(),
                    transactionId: nanoid(),
                    customerNote: orderNotes || '',
                    paymentMethod: selectedPayment,
                    ...checkoutData,
                },
            },
        })
    }

    useEffect(() => {
        if (checkoutData) {
            const responseData = checkoutData.checkout

            const currentLoc = window.location.href
            const currentUrl = parse(currentLoc, true)
            const { host, protocol } = currentUrl

            const url = parse(responseData.redirect, true)
            const query = url.query
            let newQuery
            console.log(query)
            const orderId = responseData.order.orderId
            switch (selectedPayment) {
                case 'paypal':
                    const {
                        cancel_return: cancelUrl,
                        return: returnUrl,
                        notify: notifyUrl,
                    } = query

                    const cancelParsed = parse(cancelUrl, true)
                    const returnParsed = parse(returnUrl, true)
                    const notifyParsed = parse(notifyUrl, true)

                    // cancelParsed.set('hostname', 'localhost')
                    // cancelParsed.set('port', 3000)
                    // cancelParsed.set('host', 'localhost:3000')
                    cancelParsed.set('host', host)
                    // cancelParsed.set('protocol', 'http:')
                    cancelParsed.set('protocol', protocol)

                    // returnParsed.set('hostname', 'localhost')
                    // returnParsed.set('port', 3000)
                    returnParsed.set('host', host)
                    returnParsed.set('protocol', protocol)
                    returnParsed.set('pathname', '/checkout/order-received')
                    returnParsed.set('query', {
                        ...returnParsed.query,
                        order: orderId,
                    })

                    newQuery = {
                        ...query,
                        cancel_return: cancelParsed.toString(),
                        return: returnParsed.toString(),
                    }

                    console.log(newQuery)

                    url.set('query', newQuery)
                    window.location.href = url.toString()
                    break

                case 'eway':
                    break

                default:
                    newQuery = {
                        ...query,
                        order: orderId,
                    }
                    // console.log(responseData.order.orderId)
                    // console.log(newQuery)
                    // url.set('hostname', 'localhost')
                    // url.set('port', 3000)
                    url.set('host', host)
                    url.set('protocol', protocol)
                    url.set('pathname', '/checkout/order-received')
                    url.set('query', newQuery)
                    console.log(url.toString())
                    window.location.href = url.toString()
                    break
            }
            setCheckoutData(null)
        }
    }, [checkoutData])

    if (cart.products.length === 0 && !fetchLoading) {
        return (
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Heading size="lg" marginBottom="2rem">
                    You Have 0 Item In Your Cart
                </Heading>
                <Button color="white" backgroundColor="brand.purple">
                    <NextLink href="/">
                        <a>Return To Store</a>
                    </NextLink>
                </Button>
            </Flex>
        )
    }

    return (
        <>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="2rem">
                <Flex
                    direction="column"
                    align={{
                        base: 'stretch',
                        lg: 'stretch',
                    }}
                    width="100%"
                >
                    <Box
                        border={`1px solid ${brand.gray}`}
                        maxWidth={{
                            base: '100%',
                            lg: !diffShpAddr ? '38rem' : '100%',
                        }}
                    >
                        <Heading
                            size="lg"
                            marginX={{ base: '1rem', md: '2rem' }}
                            marginY="1rem"
                            paddingY="1rem"
                            borderBottom={`1px solid ${brand.pink}`}
                        >
                            Billing Details
                        </Heading>
                        <BillingForm
                            inputs={billingInputs}
                            handleInputChange={handleBillingChange}
                        />
                    </Box>
                </Flex>
                <Box border={`1px solid ${brand.gray}`}>
                    <Flex
                        justify="center"
                        marginX={{ base: '1rem', md: '2rem' }}
                        paddingY="1rem"
                        borderBottom={`1px solid ${brand.gray}`}
                    >
                        <FormLabel htmlFor="showshipping">
                            Ship to a different address?
                        </FormLabel>
                        <Switch
                            color="purple"
                            id="showshipping"
                            size="lg"
                            value={diffShpAddr + ''}
                            onChange={handleSwitch}
                        />
                    </Flex>
                    {diffShpAddr && (
                        <Box>
                            <Heading
                                size="lg"
                                marginX={{ base: '1rem', md: '2rem' }}
                                marginY="1rem"
                                paddingY="1rem"
                                borderBottom={`1px solid ${brand.pink}`}
                            >
                                Shipping Details
                            </Heading>
                            <ShippingForm
                                inputs={shippingInputs}
                                handleInputChange={handleShippingChange}
                            />
                        </Box>
                    )}
                    <Box
                        paddingX={{ base: '1rem', lg: '2rem' }}
                        paddingBottom="2rem"
                        marginTop={diffShpAddr ? '0' : '2rem'}
                    >
                        <FormControl>
                            <FormLabel htmlFor="ordernotes">
                                Order notes (optional)
                            </FormLabel>
                            <Textarea
                                id="ordernotes"
                                placeholder="Notes about your order, e.g. special notes for delivery"
                                value={orderNotes}
                                onChange={handleNotesChange}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </SimpleGrid>
            <OrderSummary cart={cart} />
            <Heading
                size="lg"
                marginX={{ base: '1rem', md: '2rem' }}
                marginY="1rem"
            >
                Payment
            </Heading>

            <RadioGroup
                onChange={handlePaymentChange}
                defaultValue="paypal"
                value={selectedPayment}
                padding="1rem 2rem"
            >
                {payments.map((payment) => (
                    <Radio
                        width="100%"
                        key={payment.id}
                        value={payment.id}
                        size="lg"
                        variantColor="gray"
                        paddingY="0.5rem"
                    >
                        <Text as={selectedPayment === payment.id ? 'b' : 'kbd'}>
                            {payment.title}
                        </Text>
                    </Radio>
                ))}
            </RadioGroup>

            <FormControl>
                <Checkbox
                    id="term"
                    name="term"
                    variantColor="gray"
                    padding="1rem 2rem"
                    onChange={handleAgreeTerms}
                    value={agree + ''}
                    isChecked={agree}
                >
                    <Text>
                        I have read and agree to the terms and conditions *
                    </Text>
                </Checkbox>
            </FormControl>
            <Button
                margin={{ base: '1rem', lg: '2rem' }}
                color="white"
                backgroundColor="brand.purple"
                isLoading={checkoutLoading || fetchLoading}
                onClick={handleFormSubmit}
            >
                PLACE ORDER
            </Button>
        </>
    )
}

export default CheckoutContainer
