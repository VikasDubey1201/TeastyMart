import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { logingUser } from './store';
import { useNavigate } from 'react-router-dom';
import './Loging.css';

function Loging() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myFunc = (data) => {
    dispatch(logingUser(data));
    navigate('/Veg');
  };

  return (
    <div className="loging-container">
      <form className="loging-form" onSubmit={handleSubmit(myFunc)}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" {...register('username')} />
        <input type="password" placeholder="Password" {...register('password')} />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/SignUp">Sign Up</a></p>
      </form>
      <div className="login-welcome">
        <h1>WELCOME BACK!</h1>
        <p>A warm welcome to BigNewBasket! We're thrilled you've chosen us to make your grocery shopping easier and more convenient</p>
      </div>
    </div>
  );
}

export default Loging;
