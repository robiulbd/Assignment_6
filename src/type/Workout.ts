export interface Workout {
  id: string;
  name: string;
  category: string[];
  equipment: string[];
  duration: number; 
  calories: number; 
  rating: number;
  image: string;
  description?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  sets?: number;
  reps?: string;
  instructions?: string[];
}

export interface PlanItem extends Workout {
  isDone?: boolean;
  addedAt?: number;
}