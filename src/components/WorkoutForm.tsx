import React, { useState, useEffect } from 'react';
import { Workout } from '@/utils/types';

interface WorkoutFormProps {
  onAddWorkout: (workout: Omit<Workout, 'id' | 'date'>) => void;
  onEditWorkout: (workout: Omit<Workout, 'id'>) => void;
  selectedDate: Date;
  editingWorkout: Workout | null;
  onCancel: () => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({
  onAddWorkout,
  onEditWorkout,
  selectedDate,
  editingWorkout,
  onCancel
}) => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (editingWorkout) {
      setExercise(editingWorkout.exercise);
      setSets(editingWorkout.sets.toString());
      setReps(editingWorkout.reps.toString());
      setWeight(editingWorkout.weight.toString());
      setDuration(editingWorkout.duration.toString());
    } else {
      setExercise('');
      setSets('');
      setReps('');
      setWeight('');
      setDuration('');
    }
  }, [editingWorkout]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workoutData = {
      exercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weight),
      duration: parseInt(duration),
      date: selectedDate.toISOString().split('T')[0],
    };

    if (editingWorkout) {
      onEditWorkout(workoutData);
    } else {
      onAddWorkout(workoutData);
    }

    setExercise('');
    setSets('');
    setReps('');
    setWeight('');
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="exercise" className="block text-sm font-medium text-gray-300">
          Exercice
        </label>
        <input
          type="text"
          id="exercise"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="sets" className="block text-sm font-medium text-gray-300">
          Séries
        </label>
        <input
          type="number"
          id="sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="reps" className="block text-sm font-medium text-gray-300">
          Répétitions
        </label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-300">
          Poids (kg)
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          step="0.1"
          required
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-300">
          Durée (minutes)
        </label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {editingWorkout ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;