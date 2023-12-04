import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProducts from '@wasp/queries/getProducts';

export function Cart() {
  const { data: products, isLoading, error } = useQuery(getProducts);
  const removeProductFromCartFn = useAction(removeProductFromCart);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleRemoveProductFromCart = (productId) => {
    removeProductFromCartFn({ productId });
  };

  return (
    <div className='p-4'>
      {products.map((product) => (
        <div
          key={product.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{product.title}</div>
          <div>{product.description}</div>
          <div>{product.price}</div>
          <div>{product.inventory}</div>
          <button
            onClick={() => handleRemoveProductFromCart(product.id)}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            Remove from Cart
          </button>
        </div>
      ))}
      <Link
        to='/checkout'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}