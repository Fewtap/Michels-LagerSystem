'use client';

import { useFormState } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { handleLogin } from './actions';
import './page.css';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

const initialState = {
  message: '',
  error: false,
};


export default function Login() {
  const [state, formAction] = useActionState(handleLogin, initialState);

  useEffect(() => {
    if(state.error){
        toast.error(state.message,{
            position:"bottom-center"
        })
    }
  }, [state]);

  return (
    <div className='flex flex-col'>
        <Toaster></Toaster>
        <h1>Don't have an account? Register <Link href={"/register"} className='underline'>here</Link></h1>
      
      
      <form className="flex flex-col items-center justify-center h-screen" action={formAction}>
        <div className="mb-4">
          <label htmlFor="email">E-mail:</label>
          <input type="text" id="email" name="email" required />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        
        <button
          id='login-button'
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-200"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}