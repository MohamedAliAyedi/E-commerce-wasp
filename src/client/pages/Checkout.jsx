import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';

export function Checkout() {
  const { data: cart, isLoading, error } = useQuery(getCart);
  const placeOrderFn = useAction(placeOrder);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handlePlaceOrder = () => {
    placeOrderFn();
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className='w-full mb-4'>
            <thead>
              <tr>
                <th className='py-2'>Product</th>
                <th className='py-2'>Price</th>
                <th className='py-2'>Quantity</th>
                <th className='py-2'>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className='py-2'>{item.product.title}</td>
                  <td className='py-2'>{item.product.price}</td>
                  <td className='py-2'>{item.quantity}</td>
                  <td className='py-2'>{item.quantity * item.product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='flex justify-between mb-4'>
            <p className='font-bold'>Total:</p>
            <p className='font-bold'>${cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0)}</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}