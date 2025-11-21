// 'use client';
// import { useState } from 'react';

// export default function SignUpModal({ onClose }) {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     console.log('Sign Up Attempt:', { username, email, password });
//     // Here, you would call your backend API to create a new user
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded shadow-md w-80">
//         <h2 className="text-xl font-bold mb-4">Sign Up</h2>
//         <form onSubmit={handleSignUp} className="flex flex-col space-y-3">
//           <input
//             type="text"
//             placeholder="Username"
//             className="border p-2 rounded"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
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
//           <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
//             Sign Up
//           </button>
//           <button type="button" onClick={onClose} className="text-gray-500 hover:underline">
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
