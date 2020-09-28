import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
} from "@chakra-ui/core";

import ScreenLoader from "../../components/common/ScreenLoader";
import { Product } from "../../interfaces";
import { getAllProductSlugs, getProductBySlug } from "../../lib/products";
import Layout from "../../components/UI/Layout";
import ProductDetail from "../../components/ProductDetail";

type Props = {
  item?: Product;
  images?: string[];
  errors?: boolean;
};

const StaticPropsDetail = ({ item, images, errors }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <ScreenLoader />;
  }

  if (errors || !item) {
    return (
      <Layout title="Error | DEPT_X">
        <Flex height="full" alignItems="center" justifyContent="center">
          <p>
            <span style={{ color: "red" }}>ERROR: </span>
            Unable to retrieve the product!
          </p>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout title={`${item.name} | DEPT_X`}>
      <ProductDetail product={item} images={images} />
      <Tabs
        size="lg"
        variant="enclosed-colored"
        variantColor="gray"
        paddingX={{ base: "1rem", lg: 0 }}
      >
        <TabList>
          <Tab>Description</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              paddingY="1rem"
              dangerouslySetInnerHTML={{
                __html: item.description || item.shortDescription || item.name,
              }}
            ></Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default StaticPropsDetail;

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Get the paths we want to pre-render based on products
//   let slugs = []; //await getAllProductSlugs();

//   const paths = slugs.map((id) => ({
//     params: { slug: id.toString() },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: true };
// };

// // This function gets called at build time on server-side.
// // It won't be called on client-side, so you can even do
// // direct database queries.
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     const slug = params?.slug;
//     const item = await getProductBySlug(slug as string);

//     // By returning { props: item }, the StaticPropsDetail component
//     // will receive `item` as a prop at build time
//     return {
//       props: { item, images: item.gallery },
//       revalidate: 1,
//     };
//   } catch (err) {
//     console.log(err.message);
//     return { props: { errors: true } };
//   }
// };
