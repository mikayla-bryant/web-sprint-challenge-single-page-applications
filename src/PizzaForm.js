import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import axios from 'axios';
import OrderSummary from './OrderSummary';
/*Form Verification */
const schema = yup.object().shape({
  username: yup
    .string()
    .required('Name field is required.')
    .min(2, 'Name must be at least two characters.'),
  size: yup.string().oneOf(['S', 'M', 'L', 'XL'], 'Size field is required.'),
  pepperoni: yup.boolean(),
  onions: yup.boolean(),
  mushrooms: yup.boolean(),
  bellPeppers: yup.boolean(),
  sausage: yup.boolean(),
  special: yup.string(),
});

const PizzaForm = () => {
  const [form, setForm] = useState({
    //state that holds short-term form history prior to submit
    username: '',
    size: '',
    pepperoni: false,
    onions: false,
    mushrooms: false,
    bellPeppers: false,
    sausage: false,
    special: '',
  });
  const [errors, setErrors] = useState({
    //state that holds form verification error messages
    username: '',
    size: '',
    pepperoni: '',
    onions: '',
    mushrooms: '',
    bellPeppers: '',
    sausage: '',
    special: '',
  });
  const [disabled, setDisabled] = useState(true); //state that controls whether button is disabled
  const [post, setPost] = useState([]); //state that holds entire form history

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const handleChange = (event) => {
    const { checked, value, name, type } = event.target;
    const updatedInfo = type === 'checkbox' ? checked : value;
    setFormErrors(name, updatedInfo);
    setForm({ ...form, [name]: updatedInfo });
  };

  /*Disabling button unless form is validated */
  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  /*On submit, post data to server, in addition to previous data in state, and reset form.*/
  const formSubmit = (e) => {
    e.preventDefault();
    console.log('submitted!');
    const newOrder = {
      //trimming data in form state to remove whitespace
      username: form.username.trim(),
      size: form.size,
      pepperoni: form.pepperoni,
      onions: form.onions,
      mushrooms: form.mushrooms,
      bellPeppers: form.bellPeppers,
      special: form.special.trim(),
    };
    axios
      .post('https://reqres.in/api/users', newOrder) //posting data to server
      .then((res) => {
        setPost([...post, res.data]); //if successful, add data to new state named post holding entire form history
        setForm({
          // reset form
          username: '',
          size: '',
          pepperoni: false,
          onions: false,
          mushrooms: false,
          bellPeppers: false,
          sausage: '',
          special: '',
        });
        console.log('success', post);
      })
      .catch((err) => console.log('failed', err.response));
  };

  /*Form input fields*/
  return (
    <div>
      <form onSubmit={formSubmit}>
        <div className='error-message'>
          <div>{errors.username}</div>
          <div>{errors.size}</div>
          <div>{errors.pepperoni}</div>
          <div>{errors.onions}</div>
          <div>{errors.mushrooms}</div>
          <div>{errors.bellPeppers}</div>
          <div>{errors.sausage}</div>
          <div>{errors.special}</div>
        </div>
        <div className='input'>
          <label htmlFor='username' className='form-subtitle subtitle-main'>
            Name
          </label>
          <input
            value={form.username}
            name='username'
            id='name'
            type='text'
            onChange={handleChange}
          ></input>
        </div>
        <label className='input'>
          <div className='form-subtitle'>
            <p className='subtitle-text subtitle-main'>Choice of size</p>
            <p className='subtitle-text'>Required</p>
          </div>

          <select onChange={handleChange} value={form.size} name='size'>
            <option value=''>--select a size--</option>
            <option value='S'>Small (8 in)</option>
            <option value='M'>Medium (12 in)</option>
            <option value='L'>Large (14 in)</option>
            <option value='XL'>Extra-Large (16 in)</option>
          </select>
        </label>

        <section>
          <p>Select toppings:</p>

          <div>
            <input
              type='checkbox'
              id='pepperoni'
              name='pepperoni'
              checked={form.pepperoni}
              onChange={handleChange}
            />
            <label htmlFor='pepperoni'>Pepperoni</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='sausage'
              name='sausage'
              checked={form.sausage}
              onChange={handleChange}
            />
            <label htmlFor='sausage'>Sausage</label>
          </div>

          <div>
            <input
              type='checkbox'
              id='onions'
              name='onions'
              checked={form.onions}
              onChange={handleChange}
            />
            <label htmlFor='onions'>Onions</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='mushrooms'
              name='mushrooms'
              checked={form.mushrooms}
              onChange={handleChange}
            />
            <label htmlFor='mushrooms'>Mushrooms</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='bellPeppers'
              name='bellPeppers'
              checked={form.bellPeppers}
              onChange={handleChange}
            />
            <label htmlFor='bellPeppers'>Bell Peppers</label>
          </div>
        </section>
        <label className='input'>
          <p className='form-subtitle subtitle-main'>Special instructions</p>
          <textarea
            value={form.special}
            name='special'
            placeholder="Anything else you'd like to add?"
            onChange={handleChange}
            rows='5'
            cols='5'
          />
        </label>

        <button disabled={disabled}>Place order</button>
      </form>
      <OrderSummary orders={post} />
    </div>
  );
};

export default PizzaForm;
