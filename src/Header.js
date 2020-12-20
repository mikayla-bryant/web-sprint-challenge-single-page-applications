import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header>
        <h1>Lambda Eats</h1>
        <nav>
          <Link className='nav-link home-link' to='/'>
            Home
          </Link>
          <a className='nav-link help-link' href=''>
            Help
          </a>
        </nav>
      </header>
    </>
  );
};
export default Header;
