// 'use client';
// import { useState } from 'react';

// export default function SignInModal({ onClose }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     console.log('Sign In Attempt:', { email, password });
//     // Here, you would call your backend API to authenticate the user
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded shadow-md w-80">
//         <h2 className="text-xl font-bold mb-4">Sign In</h2>
//         <form onSubmit={handleSignIn} className="flex flex-col space-y-3">
//           <input
//             type="email"
//             placeholder="Email"
//             className="border p-2 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-2 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//             Sign In
//           </button>
//           <button type="button" onClick={onClose} className="text-gray-500 hover:underline">
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
