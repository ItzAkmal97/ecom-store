import { useEffect } from "react";
import { fetchProducts } from "../thunks/productThunk";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";

function ProductsPage() {
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-3xl font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-3xl font-semibold text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto gap-12">
      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {products &&
          products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center text-center"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-96 h-96 object-cover shadow-lg mb-4" // Changed object-contain to object-cover
              />
              <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
              <p className="text-2xl font-semibold mb-4">${product.price}</p>
              <p className="text-gray-700 mb-4 max-w-2xl">
                {product.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductsPage;
