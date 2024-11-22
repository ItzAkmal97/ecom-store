import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AppDispatch } from "../store/store";
import { fetchProducts } from "../features/productsSlice";

function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl font-medium text-gray-800">Loading...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl font-medium text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        {products &&
          products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center text-center h-full"
            >
              <div className="w-full h-72 mb-6">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-contain mx-auto hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col flex-grow w-full">
                <h2 className="text-xl font-bold mb-2 text-gray-900 h-14 flex items-center justify-center">
                  {product.title}
                </h2>

                <p className="text-lg font-semibold mb-3 text-gray-900">
                  ${product.price.toFixed(2)}
                </p>

                <p className="text-gray-600 mb-6 max-w-sm mx-auto text-sm leading-relaxed h-20">
                  {product.description}
                </p>

                <div className="mt-auto">
                  <button className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 w-full transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductsPage;
