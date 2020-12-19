import React from 'react';

const PizzaForm = () => {
  return (
    <div>
      <label htmlFor='name'>Name</label>
      <input id='name' type='text'></input>
      <label>
        Select size:
        <select>
          <option value='1'>Small (8 in)</option>
          <option value='2'>Medium (12 in)</option>
          <option value='3'>Large (14 in)</option>
          <option value='4'>Extra-Large (16 in)</option>
        </select>
      </label>

      <section>
        <p>Select toppings:</p>
        <div>
          <input type='checkbox' id='pepperoni' name='pepperoni' />
          <label for='pepperoni'>Pepperoni</label>
        </div>
        <div>
          <input type='checkbox' id='onions' name='onions' />
          <label for='onions'>Onions</label>
        </div>
        <div>
          <input type='checkbox' id='mushrooms' name='mushrooms' />
          <label for='mushrooms'>Mushrooms</label>
        </div>
        <div>
          <input type='checkbox' id='bell-peppers' name='bell-peppers' />
          <label for='bell-peppers'>Bell Peppers</label>
        </div>
      </section>
      <label>
        Special instructions
        <textarea placeholder='Type special instructions here' />
      </label>
      <button>Add to Cart</button>
    </div>
  );
};

export default PizzaForm;
