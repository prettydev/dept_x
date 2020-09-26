import {
    Input,
    FormControl,
    FormLabel,
    Stack,
    SimpleGrid,
    Select,
} from '@chakra-ui/core'
import TextFormInput from './TextFormInput'
import { BillingInputs } from '../../../interfaces'

type Props = {
    inputs: BillingInputs
    handleInputChange: any
}

const BillingForm = ({ inputs, handleInputChange }: Props) => {
    return (
        <Stack
            direction="column"
            padding={{ base: '1rem 1rem', md: '1rem 2rem' }}
            spacing="1.5rem"
        >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1rem">
                <TextFormInput
                    input={inputs.billingFirstName}
                    required
                    handleChangeFunc={handleInputChange}
                />
                <TextFormInput
                    input={inputs.billingLastName}
                    required
                    handleChangeFunc={handleInputChange}
                />
            </SimpleGrid>

            <TextFormInput
                input={inputs.billingCompany}
                handleChangeFunc={handleInputChange}
            />

            <FormControl marginBottom="1rem">
                <FormLabel htmlFor="country">Country</FormLabel>
                <Input
                    isDisabled
                    type="text"
                    id="country"
                    aria-describedby="billing-address-helper-text"
                    defaultValue="Australia"
                />
            </FormControl>

            <TextFormInput
                input={inputs.billingAddress1}
                required
                handleChangeFunc={handleInputChange}
            />

            <TextFormInput
                input={inputs.billingAddress2}
                handleChangeFunc={handleInputChange}
            />

            <TextFormInput
                input={inputs.billingSuburb}
                required
                handleChangeFunc={handleInputChange}
            />

            <FormControl isRequired>
                <FormLabel htmlFor={`${inputs.billingState.name}`}>
                    State
                </FormLabel>
                <Select
                    id={`${inputs.billingState.name}`}
                    defaultValue="Victoria"
                    onChange={handleInputChange}
                >
                    <option value="Australian Capital Territory">
                        Australian Capital Territory
                    </option>
                    <option value="New South Wales">New South Wales</option>
                    <option value="Northern Territory">
                        Northern Territory
                    </option>
                    <option value="Queensland">Queensland</option>
                    <option value="South Australia">South Australia</option>
                    <option value="Tasmania">Tasmania</option>
                    <option value="Victoria">Victoria</option>
                    <option value="Western Australia">Western Australia</option>
                </Select>
            </FormControl>

            <TextFormInput
                input={inputs.billingPostcode}
                required
                handleChangeFunc={handleInputChange}
            />

            <TextFormInput
                input={inputs.billingPhone}
                required
                handleChangeFunc={handleInputChange}
            />

            <TextFormInput
                input={inputs.billingEmail}
                required
                handleChangeFunc={handleInputChange}
            />
        </Stack>
    )
}

export default BillingForm
