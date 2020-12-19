import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <p>YUMMY TUMMY</p>
      <Link to='/'>Home</Link>
      <Link to='pizza'>Place an order</Link>
    </>
  );
};
export default Header;
