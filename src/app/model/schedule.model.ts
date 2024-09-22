import { Topic } from './topic.model';

export interface Schedule {
  id: string | number;
  date: string;
  topics: Topic[];
  totalTimeInMinutes: number;
  breakTimeBetweenTopicsInMinutes: number;
  lastUpdated: string;
  groups: number[];
  numberOfStudents: number;
  numberOfInstructorsNeeded: number;
  instructors: string[];
  rooms: number[];
}
