'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function AuthModal({ onClose }) {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign In:', { signInEmail, signInPassword });
    onClose();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up:', { signUpUsername, signUpEmail, signUpPassword });
    onClose();
  };

  const oauthProviders = [
    { name: 'Google', id: 'google', color: 'bg-red-500' },
    { name: 'GitHub', id: 'github', color: 'bg-gray-800' },
    { name: 'Facebook', id: 'facebook', color: 'bg-blue-600' },
    { name: 'Twitter', id: 'twitter', color: 'bg-blue-400' },
    { name: 'Apple', id: 'apple', color: 'bg-black' },
    { name: 'Yahoo', id: 'yahoo', color: 'bg-purple-600' },
    { name: 'LinkedIn', id: 'linkedin', color: 'bg-blue-700' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSignIn} className="flex flex-col space-y-2">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Sign In
          </button>
        </form>

        <div className="my-2 flex flex-wrap gap-2">
          {oauthProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => signIn(provider.id)}
              className={`${provider.color} text-white p-2 rounded flex-1 hover:opacity-90`}
            >
              {provider.name}
            </button>
          ))}
        </div>

        <hr className="my-4" />

        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp} className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
            value={signUpUsername}
            onChange={(e) => setSignUpUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Sign Up
          </button>
        </form>

        <button type="button" onClick={onClose} className="mt-4 text-gray-500 hover:underline">
          Cancel
        </button>
      </div>
    </div>
  );
}
