export interface Task {
  id: string;
  category?: TaskCaterogy;
  title: string;
  desc?: string;
  due_date?: Date;
  cost: number;
  period?: TaskPeriod;
  results: TaskResult[];
}

export interface TaskResult {
  userId: string;
  adminId?: string;
  approved?: boolean;
}

export enum TaskCaterogy {
  Kitchen = 'kitchen',
  Kidsroom = 'kidsroom',
  Laundry = 'laundry',
  Garbage = 'garbage',
}

export enum TaskPeriod {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}
