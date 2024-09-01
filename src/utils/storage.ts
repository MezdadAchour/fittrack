'use client'
import { Workout } from '@/utils/types';

const LOCAL_STORAGE_KEY = 'fittrackData';

const defaultData = { workouts: [] as Workout[] };

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    return data ? JSON.parse(data) : defaultData;
  } catch (error) {
    console.error('Failed to parse localStorage data', error);
    return defaultData;
  }
};

export const saveDataToLocalStorage = (data: { workouts: Workout[] }) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data to localStorage', error);
  }
};

export const getWorkouts = (): Workout[] => {
  const data = getDataFromLocalStorage();
  return data.workouts;
};

export const addWorkout = (workout: Workout) => {
  const data = getDataFromLocalStorage();
  data.workouts.push(workout);
  saveDataToLocalStorage(data);
};

export const deleteWorkout = (id: string) => {
  const data = getDataFromLocalStorage();
  data.workouts = data.workouts.filter((w: Workout) => w.id !== id);
  saveDataToLocalStorage(data);
};

export const updateWorkout = (updatedWorkout: Workout) => {
  const data = getDataFromLocalStorage();
  data.workouts = data.workouts.map((w: Workout) =>
    w.id === updatedWorkout.id ? updatedWorkout : w
  );
  saveDataToLocalStorage(data);
};

export const getWorkoutStats = (): {
  totalWorkouts: number;
  uniqueWorkoutTypes: number;
  totalDuration: number;
  averageDuration: number;
  workoutsByType: Record<string, number>;
} => {
  const workouts = getWorkouts();
  const totalWorkouts = workouts.length;
  const workoutTypes = new Set(workouts.map(w => w.type));
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const averageDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0;

  const workoutsByType = workouts.reduce((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalWorkouts,
    uniqueWorkoutTypes: workoutTypes.size,
    totalDuration,
    averageDuration,
    workoutsByType
  };
};
