import Layout from "../components/UI/Layout";
import { Flex } from "@chakra-ui/core";

export default function Custom404() {
  return (
    <Layout title="Not Found | DEPT_X">
      <Flex height="full" alignItems="center" justifyContent="center">
        404 - This Page cannot be found!
      </Flex>
    </Layout>
  );
}
