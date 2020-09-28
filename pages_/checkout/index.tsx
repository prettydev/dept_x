import Layout from "../../components/UI/Layout";
import { Box, Heading, Divider } from "@chakra-ui/core";
import CheckoutContainer from "../../components/checkout/CheckoutContainer";

const CheckoutPage = () => {
  return (
    <Layout title="Checkout">
      <Box width="full" padding={{ base: "1rem", md: "2rem" }}>
        <Heading>Checkout</Heading>
        <Divider marginY={{ base: "1rem", md: "2rem" }} />
        <CheckoutContainer />
      </Box>
    </Layout>
  );
};

export default CheckoutPage;
