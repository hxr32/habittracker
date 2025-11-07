import React from 'react';

function HabitCard({ habit, onComplete }) {
  const { name, goal, motivation, streak, progress, reminderTime } = habit;

  const handleComplete = () => {
    const today = new Date().toLocaleDateString();
    if (habit.lastCompleted !== today) {
      onComplete(habit.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Progress Circle */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="3"
              strokeDasharray={`${progress}, 100`}
            />
            <text x="18" y="20.35" className="text-3xl" textAnchor="middle" fill="#4F46E5">
              {progress}%
            </text>
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Streak</span>
          <span className="text-2xl font-bold text-indigo-600">{streak}</span>
          <span className="text-indigo-600">🔥</span>
        </div>
      </div>

      {/* Habit Details */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{goal}</p>
        <p className="text-sm text-indigo-600">{motivation}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>⏰ {reminderTime}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleComplete}
        disabled={habit.lastCompleted === new Date().toLocaleDateString()}
        className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium 
          ${
            habit.lastCompleted === new Date().toLocaleDateString()
              ? 'bg-emerald-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
      >
        {habit.lastCompleted === new Date().toLocaleDateString() ? 'Completed Today ✓' : 'Mark as Done'}
      </button>
    </div>
  );
}

export default HabitCard;
