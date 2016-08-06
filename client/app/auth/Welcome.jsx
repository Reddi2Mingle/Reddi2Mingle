import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div> 
      <Link to='/login' > Login here </Link>
      <Link to='/signup' > Sign Up Here </Link>
    </div>
  );
};