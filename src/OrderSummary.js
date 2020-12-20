import React from 'react';

const OrderSummary = ({ orders }) => {
  return orders.map((order) => {
    return (
      <div key={order.id}>
        <p>
          Thanks for placing your order, {order.username}! Here's an order
          summary:
        </p>
        <p>Size: {order.size}</p>
        <p>Toppings:</p>
        <ul>
          {order.onions === true ? <li>Onions</li> : ''}
          {order.pepperoni === true ? <li>Pepperoni</li> : ''}
          {order.mushrooms === true ? <li>Mushrooms</li> : ''}
          {order.bellPeppers === true ? <li>Bell Peppers</li> : ''}
          {order.sausage === true ? <li>Sausage</li> : ''}
        </ul>
        <p>Special instructions: {order.special}</p>
      </div>
    );
  });
};

export default OrderSummary;
