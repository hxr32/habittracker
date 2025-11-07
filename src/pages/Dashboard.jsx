import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HabitCard from '../components/HabitCard';

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Load habits from localStorage
    const storedHabits = JSON.parse(localStorage.getItem('habits') || '[]');
    setHabits(storedHabits);
    
    // Load user name
    const storedName = localStorage.getItem('userName') || 'Friend';
    setUserName(storedName);
  }, []);

  const handleComplete = (habitId) => {
    const today = new Date().toLocaleDateString();
    
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId && habit.lastCompleted !== today) {
        return {
          ...habit,
          streak: habit.lastCompleted === new Date(Date.now() - 86400000).toLocaleDateString()
            ? habit.streak + 1
            : 1,
          progress: Math.min(100, habit.progress + 10),
          lastCompleted: today
        };
      }
      return habit;
    });

    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userName}! 👋
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Track your daily progress and build lasting habits.
              </p>
            </div>
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add New Habit
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Empty State */}
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No habits yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first habit.
            </p>
            <div className="mt-6">
              <Link
                to="/create"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create a New Habit
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onComplete={handleComplete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Progress Link */}
      {habits.length > 0 && (
        <div className="fixed bottom-8 right-8">
          <Link
            to="/progress"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
          >
            View Progress 📈
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
