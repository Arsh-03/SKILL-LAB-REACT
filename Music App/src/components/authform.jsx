import React, {useState} from 'react';


const signin = ({ setIsLogin }) => {
  return (
    <form className='form'>
        <h2>Sign In</h2>
        <input type="email" id="email" placeholder='Email' required />
        <input type="password" id="password" placeholder='Password' required />
        <p><a href="#">Forgot Password?</a></p>
        <button type="submit">Login</button>
        <p>Don't have an account? <a type="button" onClick={() => setIsLogin(false)}>Sign Up</a></p>
    </form>
  )
}

const signup = ({ setIsLogin }) => {
  return (
    <form className='form'>
        <h2>Sign Up</h2>
        <input type="email" id="email" placeholder='Email' required />
        <input type="password" id="password" placeholder='Password' required />
        <input type="password" id="confirmPassword" placeholder='Confirm Password' required />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a type="button" onClick={() => setIsLogin(true)}>Sign In</a></p>
    </form>
  )
}

const Authform = () => {
  const [isLogin, setIsLogin] = useState(true)
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
        {isLogin ? signin({ setIsLogin }) : signup({ setIsLogin })}
      </div>
    </div>
  );
}

export default Authform;
