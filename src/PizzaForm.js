import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
const schema = yup.object().shape({
  username: yup
    .string()
    .required('This field is required.')
    .min(2, 'Name must be at least two characters.'),
  size: yup.string().oneOf(['S', 'M', 'L', 'XL'], 'Please select a size.'),
  pepperoni: yup.boolean(),
  onions: yup.boolean(),
  mushrooms: yup.boolean(),
  bellPeppers: yup.boolean(),
  special: yup.string(),
});

const PizzaForm = () => {
  const [form, setForm] = useState({
    username: '',
    size: '',
    pepperoni: false,
    onions: false,
    mushrooms: false,
    bellPeppers: false,
    special: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    size: '',
    pepperoni: '',
    onions: '',
    mushrooms: '',
    bellPeppers: '',
    special: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [post, setPost] = useState([]);

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
  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);
  const formSubmit = (e) => {
    e.preventDefault();
    console.log('submitted!');
    const newOrder = {
      username: form.username.trim(),
      size: form.size,
      pepperoni: form.pepperoni,
      onions: form.onions,
      mushrooms: form.mushrooms,
      bellPeppers: form.bellPeppers,
      special: form.special.trim(),
    };
    axios
      .post('https://reqres.in/api/users', newOrder)
      .then((res) => {
        setPost([...post, res.data]);
        setForm({
          username: '',
          size: '',
          pepperoni: false,
          onions: false,
          mushrooms: false,
          bellPeppers: false,
          special: '',
        });
        console.log('success', post);
      })
      .catch((err) => console.log('failed', err.response));
  };
  return (
    <div>
      <form onSubmit={formSubmit}>
        <div>
          <div>{errors.username}</div>
          <div>{errors.size}</div>
          <div>{errors.pepperoni}</div>
          <div>{errors.onions}</div>
          <div>{errors.mushrooms}</div>
          <div>{errors.bellPeppers}</div>
          <div>{errors.special}</div>
        </div>
        <label htmlFor='username'>
          {/*errors.username.length > 0 && <p className='error'>{errors.email}</p>*/}{' '}
          Name
        </label>
        <input
          value={form.username}
          name='username'
          id='name'
          type='text'
          onChange={handleChange}
        ></input>
        <label>
          {/* {errors.size.length > 0 && <p className='error'>{errors.email}</p>} */}
          Select size:
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
        <label>
          Special instructions
          <textarea
            value={form.special}
            name='special'
            placeholder='Type special instructions here'
            onChange={handleChange}
          />
        </label>
        <button disabled={disabled}>Place order</button>
      </form>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
};

export default PizzaForm;
