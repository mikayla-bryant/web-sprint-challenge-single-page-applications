import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className='pizza-background-home'>
        <Link to='pizza'>Pizza?</Link>
      </div>
    </div>
  );
};
export default Home;
