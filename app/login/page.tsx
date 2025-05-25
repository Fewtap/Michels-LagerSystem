import { createClient } from '@/utils/serverclient';
import './page.css'
import { redirect } from 'next/navigation';

export default function Login(){

    async function handleLogin(formData: FormData) {
        'use server';
        const username = formData.get('email') as string;
        const password = formData.get('password') as string;
        console.log('Login attempt with username:', username, 'and password:', password)

        const supabase = await createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });

        if (error) {
            console.error('Login error:', error);
            // Optionally, you can redirect or set a cookie/flash message here
            return;
        }
        console.log('Login successful:', data);
        // Redirect to the home page or another page after successful login
        // For example, using Next.js redirect:
        // redirect('/');
        redirect('/'); // Redirect to home page after successful login
    }


    return (
        <div>
        <h1>Login Page</h1>
        <p>Please log in to continue.</p>
        <form className="flex flex-col items-center justify-center h-screen" action={handleLogin}>
            <div className="mb-4">
                <label htmlFor="email">E-mail:</label>
                <input type="text" id="email" name="email" required />
            </div>
            <div className="mb-4">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button
            formAction={handleLogin}
                id='login-button'
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-200"
                type="submit"
            >
                Login
            </button>
        </form>
        <p>Don't have an account? <a href="/register">Register here</a>.</p>
        <p>Forgot your password? <a href="/reset-password">Reset it here</a>.</p>
        <p>Need help? <a href="/help">Visit our help page</a>.</p>
        </div>
    );
}