export interface Workout {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  duration: number;
  date: string;
}

export interface WorkoutStats {
  totalWorkouts: number;
  uniqueWorkoutTypes: number;
  totalDuration: number;
  averageDuration: number;
  workoutsByType: Record<string, number>;
}
