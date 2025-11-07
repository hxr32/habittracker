import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
  const [name, setName] = useState('');
  const [firstHabit, setFirstHabit] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', name);
    navigate('/create', { state: { initialHabit: firstHabit } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-emerald-500">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-indigo-600">Small wins. Daily progress.</h1>
        <p className="mt-4 text-lg text-center text-gray-600">Welcome to HabitFlow. Let's get started.</p>
        <form onSubmit={handleSubmit} className="mt-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name or email"
            className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            value={firstHabit}
            onChange={(e) => setFirstHabit(e.target.value)}
            placeholder="What habit would you like to build first?"
            className="mt-4 w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button 
            type="submit"
            className="mt-8 w-full px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
}

export default Onboarding;
