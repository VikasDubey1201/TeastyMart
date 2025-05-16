import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from './store';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myFunc = (data) => {
  console.log('Form Data:', data);
  dispatch(registerUser(data));
  alert('Registration Successful. Please login.');
  navigate('/loging');
};

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>WELCOME!</h1>
        <p>Join us today and start shopping smart.</p>
      </div>
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit(myFunc)}>
          <h2>Sign Up</h2>

          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: true })}
          />
          {errors.userName && <span className="error">Username is required</span>}

          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && <span className="error">Password is required</span>}

          <input
            type="email"
            placeholder="Email@gmail.com"
            {...register('email', { required: true })}
          />
          {errors.email && <span className="error">Email is required</span>}

          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Male"
                {...register('gender', { required: true })}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                {...register('gender', { required: true })}
              />
              Female
            </label>
          </div>
          {errors.gender && <span className="error">Gender is required</span>}

          <div className="select-group">
            <label>Category:</label>
            <select {...register('category', { required: true })}>
              <option value="">Select Category</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          {errors.category && <span className="error">Category is required</span>}

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/loging">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
