import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProducts from '@wasp/queries/getProducts';

export function Products() {
  const { data: products, isLoading, error } = useQuery(getProducts);
  const addToCartFn = useAction(addToCart);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddToCart = (productId) => {
    addToCartFn({ productId });
  };

  return (
    <div className="p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg"
        >
          <div>{product.title}</div>
          <div>{product.price}</div>
          <div>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}