import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Sub-component for Sign In
const SignIn = ({ setIsLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Sign In Data:", data);
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>
      
      <input 
        type="email" 
        placeholder='Email' 
        {...register("email", { required: "Email is required" })} 
      />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <input 
        type="password" 
        placeholder='Password' 
        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })} 
      />
      {errors.password && <span className="error">{errors.password.message}</span>}

      <p><a href="#">Forgot Password?</a></p>
      <button type="submit">Login</button>
      <p>Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Sign Up</a></p>
    </form>
  );
};

// Sub-component for Sign Up
const SignUp = ({ setIsLogin }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log("Sign Up Data:", data);
  };

  // Watch confirmPassword to ensure it matches password
  const password = watch("password");

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>
      
      <input 
        type="email" 
        placeholder='Email' 
        {...register("email", { required: "Email is required" })} 
      />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <input 
        type="password" 
        placeholder='Password' 
        {...register("password", { required: "Password is required" })} 
      />
      {errors.password && <span className="error">{errors.password.message}</span>}

      <input 
        type="password" 
        placeholder='Confirm Password' 
        {...register("confirmPassword", { 
          required: "Please confirm your password",
          validate: value => value === password || "Passwords do not match"
        })} 
      />
      {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}

      <button type="submit">Sign Up</button>
      <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Sign In</a></p>
    </form>
  );
};

const Authform = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='container'>
      <div className="form-container">
        <div className="form-toggle">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
            Sign In
          </button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
            Sign Up
          </button>
        </div>
        {/* Render as Components, passing the setter */}
        {isLogin ? <SignIn setIsLogin={setIsLogin} /> : <SignUp setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
};

export default Authform;