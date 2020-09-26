const currencyFormatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
})

export const toAUD = (num: number): string => {
    return currencyFormatter.format(num)
}

export const getFloatVal = (currencyString: string): number => {
    const number = Number(currencyString.replace(/[^0-9\.-]+/g, ''))
    return number ? parseFloat(number.toFixed(2)) : 0.0
}

export const showSuccess = (toast, message) => {
    toast({
        title: message,
        status: 'success',
        duration: 2000,
        isClosable: true,
    })
}

export const showError = (toast, message) => {
    toast({
        title: message,
        status: 'error',
        duration: 2000,
        isClosable: true,
    })
}

export const showWarning = (toast, message) => {
    toast({
        title: message,
        status: 'warning',
        duration: 2000,
        isClosable: true,
    })
}
