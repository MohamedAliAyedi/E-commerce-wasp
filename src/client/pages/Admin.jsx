import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProducts from '@wasp/queries/getProducts';
import updateProduct from '@wasp/actions/updateProduct';
import updateOrderStatus from '@wasp/actions/updateOrderStatus';
import createProduct from '@wasp/actions/createProduct';

export function Admin() {
  const { data: products, isLoading, error } = useQuery(getProducts);
  const updateProductFn = useAction(updateProduct);
  const updateOrderStatusFn = useAction(updateOrderStatus);
  const createProductFn = useAction(createProduct);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      <h1>Admin Page</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Inventory: {product.inventory}</p>
          <button
            onClick={() => updateProductFn({ id: product.id, price: product.price + 10 })}
          >
            Increase Price
          </button>
          <button
            onClick={() => updateOrderStatusFn({ id: 1, status: 'Delivered' })}
          >
            Update Order Status
          </button>
        </div>
      ))}
      <button
        onClick={() => createProductFn({
          title: 'New Product',
          description: 'A new product',
          price: 99.99,
          inventory: 10
        })}
      >
        Create Product
      </button>
      <Link to='/orders'>
        <button>View Orders</button>
      </Link>
    </div>
  );
}