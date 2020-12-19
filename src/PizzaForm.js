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
    </div>
  );
};

export default PizzaForm;
