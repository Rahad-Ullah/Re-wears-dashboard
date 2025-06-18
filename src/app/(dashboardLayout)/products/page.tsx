import ProductsTable from "@/components/page/products/ProductsTable";
import { myFetch } from "@/utils/myFetch";

const ProductPage = async ({ searchParams }) => {
  const { category, minPrice, maxPrice, condition, status } =
    await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(category && { category }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    ...(condition && { condition }),
    ...(status && { status }),
  });

  const res = await myFetch(`/product?${queryParams.toString()}`, {
    method: "GET",
    tags: ["products"],
  });

  return (
    <>
      <ProductsTable
        products={res?.data || []}
        meta={res?.pagination || {}}
        filters={{ category }}
      />
    </>
  );
};

export default ProductPage;
