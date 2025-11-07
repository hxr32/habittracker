import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PRESET_HABITS = [
  { name: 'Read a book', goal: 'Read 5 pages daily', motivation: '📚 Knowledge is power!' },
  { name: 'Exercise', goal: '15 minutes of workout', motivation: '💪 Stronger every day!' },
  { name: 'Meditate', goal: '5 minutes of mindfulness', motivation: '🧘‍♂️ Peace begins within' },
  { name: 'Drink water', goal: '8 glasses of water', motivation: '💧 Stay hydrated, stay healthy!' }
];

function CreateHabit() {
  const navigate = useNavigate();
  const location = useLocation();
  const [habitName, setHabitName] = useState('');
  const [microGoal, setMicroGoal] = useState('');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [motivation, setMotivation] = useState('');
  
  useEffect(() => {
    if (location.state?.initialHabit) {
      setHabitName(location.state.initialHabit);
    }
  }, [location.state]);

  const handleSave = (e) => {
    e.preventDefault();
    const habit = {
      id: Date.now(),
      name: habitName,
      goal: microGoal,
      reminderTime,
      motivation,
      streak: 0,
      progress: 0,
      lastCompleted: null
    };

    // Get existing habits or initialize empty array
    const existingHabits = JSON.parse(localStorage.getItem('habits') || '[]');
    localStorage.setItem('habits', JSON.stringify([...existingHabits, habit]));
    
    navigate('/dashboard');
  };

  const selectPreset = (preset) => {
    setHabitName(preset.name);
    setMicroGoal(preset.goal);
    setMotivation(preset.motivation);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-emerald-500">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 m-4">
        <h1 className="text-3xl font-bold text-indigo-600 text-center">Create a New Habit</h1>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {PRESET_HABITS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => selectPreset(preset)}
              className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200"
            >
              {preset.name}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Habit Name</label>
            <input
              type="text"
              required
              placeholder="e.g., Read a book"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="mt-1 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Micro-goal</label>
            <input
              type="text"
              required
              placeholder="e.g., Read 5 pages daily"
              value={microGoal}
              onChange={(e) => setMicroGoal(e.target.value)}
              className="mt-1 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Daily Reminder</label>
            <input
              type="time"
              required
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="mt-1 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Motivation Phrase</label>
            <textarea
              placeholder="What motivates you to keep this habit?"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              className="mt-1 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateHabit;
