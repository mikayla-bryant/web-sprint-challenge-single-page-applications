import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className='pizza-background-home'>
        <div>
          <p>Your favorite food, delivered while coding</p>
          <Link to='pizza'>Pizza?</Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
