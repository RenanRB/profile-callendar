export interface Calendar {
  id: number;
  dayWeek: string;
  month: string;
  day: string;
  scheduledTime?: Array<number>;
}
