import ProductsTable from "@/components/page/products/ProductsTable";
import { myFetch } from "@/utils/myFetch";

const ProductPage = async ({ searchParams }) => {
  const { category, minPrice, maxPrice, condition, status, searchTerm } =
    await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(category && { "category.category": category }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    ...(condition && { condition }),
    ...(status && { status }),
    ...(searchTerm && { searchTerm }),
  });

  const res = await myFetch(`/product?${queryParams.toString()}`, {
    method: "GET",
    tags: ["products"],
  });

  console.log(res);

  return (
    <>
      <ProductsTable
        products={res?.data || []}
        meta={res?.pagination}
        filters={{ category }}
      />
    </>
  );
};

export default ProductPage;
