import { theme } from '@chakra-ui/core'

export const brand = {
    black: '#060606',
    purple: '#9c6492',
    gray: '#444444',
    pink: '#ede6ec',
}

export default {
    ...theme,
    colors: {
        ...theme.colors,
        brand,
    },
}
