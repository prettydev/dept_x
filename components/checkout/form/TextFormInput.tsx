import { FormControl, FormLabel, Input, Box } from '@chakra-ui/core'

type Input = {
    displayName: string
    name: string
    value: string
    error: string
}

type Props = {
    input: Input
    required?: boolean
    handleChangeFunc: any
}

const TextFormInput = ({ input, handleChangeFunc, required }: Props) => {
    return (
        <FormControl
            isRequired={required}
            marginBottom="1.5rem"
            position="relative"
        >
            <FormLabel htmlFor={input.name}>{input.displayName}</FormLabel>
            <Input
                type="text"
                id={input.name}
                aria-describedby={`${input.name}-helper-text`}
                value={input.value}
                onChange={(e) => {
                    e.persist()
                    handleChangeFunc(e)
                }}
            />
            <Box as="span" position="absolute" color="red.500">
                {input.error && input.error}
            </Box>
        </FormControl>
    )
}

export default TextFormInput
