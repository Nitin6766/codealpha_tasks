import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const FitnessTrackerApp = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('fitnessEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [form, setForm] = useState({ steps: '', workout: '', calories: '' });

  useEffect(() => {
    localStorage.setItem('fitnessEntries', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEntry = () => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      steps: parseInt(form.steps),
      workout: form.workout,
      calories: parseInt(form.calories),
    };
    setEntries([...entries, newEntry]);
    setForm({ steps: '', workout: '', calories: '' });
  };

  const totalCalories = entries.reduce((acc, curr) => acc + curr.calories, 0);
  const totalSteps = entries.reduce((acc, curr) => acc + curr.steps, 0);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Fitness Tracker</h1>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Log Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            <Input
              name="steps"
              type="number"
              placeholder="Steps"
              value={form.steps}
              onChange={handleChange}
            />
            <Input
              name="workout"
              placeholder="Workout Type"
              value={form.workout}
              onChange={handleChange}
            />
            <Input
              name="calories"
              type="number"
              placeholder="Calories Burned"
              value={form.calories}
              onChange={handleChange}
            />
          </div>
          <Button onClick={handleAddEntry}>Add Entry</Button>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Progress Summary</h2>
          <p>Total Steps: {totalSteps}</p>
          <p>Total Calories Burned: {totalCalories}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Weekly Activity</h2>
          <LineChart width={500} height={300} data={entries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="steps" stroke="#8884d8" />
            <Line type="monotone" dataKey="calories" stroke="#82ca9d" />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default FitnessTrackerApp;
