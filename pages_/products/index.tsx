import { GetStaticProps } from "next";

import { Category } from "../../interfaces";
import { getAllCategories } from "../../lib/categories";
import Layout from "../../components/UI/Layout";
import CategoryContainer from "../../components/CategoryContainer";

type Props = {
  categories: Category[];
};

const ProductsPage = ({ categories }: Props) => (
  <Layout title="All Products | DEPT_X">
    {categories.map((cat) => {
      if (cat.products?.length > 0 && !cat.children?.length) {
        return (
          <CategoryContainer
            key={cat.id}
            name={cat.name}
            products={cat.products}
          />
        );
      }
    })}
  </Layout>
);

// export const getStaticProps: GetStaticProps = async () => {
//   const categories: Category[] = []; //await getAllCategories();
//   return { props: { categories } };
// };

export default ProductsPage;
