// Signing.jsx
import React, { useState } from 'react';
import SignUp from './SignUp';
import Loging from './loging';

function Signing() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className='form'>
      {/* Toggle Menu */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowLogin(false)}>Sign Up</button>
      </div>

      {/* Conditional Rendering */}
      {showLogin ? <Loging /> : <SignUp />}
    </div>
  );
}

export default Signing;
