import React from 'react';

const OrderSummary = ({ orders }) => {
  return orders.map((order) => {
    return (
      <div key={order.id}>
        <h2>{order.username}</h2>
        <p>Thanks for placing your order! Here's an order summary:</p>
        <p>Size: {order.size}</p>
        <p>Special instructions: {order.special}</p>
      </div>
    );
  });
};

export default OrderSummary;
