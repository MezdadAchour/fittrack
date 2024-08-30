// utils/storage.ts

import { Workout } from '@/utils/types';

const LOCAL_STORAGE_KEY = 'fittrackData';

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : { workouts: [] as Workout[] };
};

export const saveDataToLocalStorage = (data: { workouts: Workout[] }) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};
