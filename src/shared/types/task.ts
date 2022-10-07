export interface Task {
  id: string;
  category?: TaskCaterogy;
  title: string;
  desc?: string;
  due_date?: Date;
  assignee?: string;
  cost: number;
  isPeriodic?: boolean;
  period?: TaskPeriod;
  done?: boolean;
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
