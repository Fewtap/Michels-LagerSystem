'use server';

import { createClient } from '@/utils/serverclient';
import { redirect } from 'next/navigation';

export async function handleLogin(prevState: any, formData: FormData) {
  const username = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  console.log('Login attempt with username:', username);
  
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) {
    console.error('Login error:', error);
    return {
      message: error.message || 'Login failed. Please check your credentials.',
      error: true,
    };
  }

  console.log('Login successful:', data);
  redirect('/'); // This will only execute if no error occurred
}