import React from 'react';
import Home from './Home';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';
import PizzaForm from './PizzaForm';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/order'>
          <PizzaForm />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </>
  );
};
export default App;
