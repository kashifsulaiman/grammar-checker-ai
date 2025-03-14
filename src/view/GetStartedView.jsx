'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const GetStartedView = () => {

    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const testPassword = '123456';
    const testEmail = 'test@gmail.com';

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!password || !email){
          if(!email){
            toast.error('Email is required')
            return;
          }
          if(!password){
            toast.error('Password is required')
            return;
          }
        }
        if(!isValidEmail(email)){
            toast.error('Email is not valid')
            return;
        }
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                toast.error('Failed to login');
            }
            const data = await response.json();
            if(!data.success){
                toast.error(data.message || 'An error occurred');
                return;
            }
            toast.success(data.message);
            localStorage.setItem('user', JSON.stringify(data.body));
            router.push('/main');
 
        } catch (error) {
            toast.error('An error occurred');
        }
    }



    return (
      <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="flex flex-col bg-blue-300 rounded-md p-4" >
                <div className="flex items-center justify-between">
                  <p className="block text-sm/6 font-medium text-gray-900">
                    Test email: <span className="font-bold">{testEmail}</span>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="block text-sm/6 font-medium text-gray-900">
                    Test password: <span className="font-bold">{testPassword}</span>
                  </p>
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  
  export default GetStartedView