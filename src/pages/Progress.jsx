import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const BADGES = {
  BEGINNER: { name: 'Beginner', threshold: 7, icon: '🌱' },
  CONSISTENT: { name: 'Consistent', threshold: 30, icon: '⭐' },
  MASTER: { name: 'Master', threshold: 100, icon: '🏆' }
};

function Progress() {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const loadHabits = () => {
      const storedHabits = JSON.parse(localStorage.getItem('habits') || '[]');
      setHabits(storedHabits);
      if (storedHabits.length > 0) {
        setSelectedHabit(storedHabits[0]);
      }
    };

    loadHabits();
  }, []);

  useEffect(() => {
    if (selectedHabit) {
      // Generate mock data for visualization
      const generateWeeklyData = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days.map(day => ({
          name: day,
          progress: Math.floor(Math.random() * 100),
          streak: selectedHabit.streak
        }));
      };

      const generateMonthlyData = () => {
        return Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          progress: Math.floor(Math.random() * 100),
          streak: Math.min(i + 1, selectedHabit.streak)
        }));
      };

      setWeeklyData(generateWeeklyData());
      setMonthlyData(generateMonthlyData());
    }
  }, [selectedHabit]);

  const getBadges = (streak) => {
    return Object.values(BADGES).filter(badge => streak >= badge.threshold);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Progress Tracker</h1>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No habits to track yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by creating your first habit to see progress.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Habit Selector */}
            <div className="bg-white p-4 rounded-lg shadow">
              <label className="block text-sm font-medium text-gray-700">Select Habit</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                value={selectedHabit?.id}
                onChange={(e) => setSelectedHabit(habits.find(h => h.id === parseInt(e.target.value)))}
              >
                {habits.map((habit) => (
                  <option key={habit.id} value={habit.id}>
                    {habit.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedHabit && (
              <>
                {/* Badges */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Achievements</h2>
                  <div className="flex gap-4">
                    {getBadges(selectedHabit.streak).map((badge) => (
                      <div
                        key={badge.name}
                        className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full"
                      >
                        <span className="text-2xl">{badge.icon}</span>
                        <span className="text-indigo-700 font-medium">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Progress */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Progress</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="progress" fill="#4F46E5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Monthly Streak */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Streak</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="streak"
                          stroke="#10B981"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Progress;
