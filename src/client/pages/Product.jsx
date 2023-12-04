import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProduct from '@wasp/queries/getProduct';
import createOrder from '@wasp/actions/createOrder';

export function ProductPage() {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useQuery(getProduct, { id: parseInt(productId) });
  const createOrderFn = useAction(createOrder);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddToCart = () => {
    createOrderFn({ userId: 1, productIds: [parseInt(productId)] });
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>{product.title}</h2>
      <p className='mb-4'>{product.description}</p>
      <p className='font-bold mb-4'>Price: ${product.price}</p>
      <p className='font-bold mb-4'>Inventory: {product.inventory}</p>
      <button
        onClick={handleAddToCart}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Add to Cart
      </button>
    </div>
  );
}