'use server';

import { createClient } from '@/utils/serverclient';
import { redirect } from 'next/navigation';

export async function handleRegister(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const fullName = formData.get('fullName') as string;

  // Basic validation
  if (!email || !password || !confirmPassword || !fullName) {
    return {
      message: 'All fields are required.',
      error: true,
      success: false
    };
  }

  if (password !== confirmPassword) {
    return {
      message: 'Passwords do not match.',
      error: true,
      success: false
    };
  }

  if (password.length < 6) {
    return {
      message: 'Password must be at least 6 characters long.',
      error: true,
      success: false
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      message: 'Please enter a valid email address.',
      error: true,
      success: false
    };
  }

  console.log('Registration attempt with email:', email);

  try {
    const supabase = await createClient();
    
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      console.error('Registration error:', error);
      return {
        message: error.message || 'Registration failed. Please try again.',
        error: true,
        success: false
      };
    }

    console.log('Registration successful:', data);

    // Check if email confirmation is required
    if (data.user && !data.user.email_confirmed_at) {
      return {
        message: 'Registration successful! Please check your email to confirm your account.',
        error: false,
        success: true,
        requiresConfirmation: true
      };
    }

    // If no confirmation required, redirect to login or home
    redirect('/login?message=' + encodeURIComponent('Registration successful! Please log in.'));
    
  } catch (error) {
    console.error('Unexpected registration error:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      error: true,
      success: false
    };
  }
}