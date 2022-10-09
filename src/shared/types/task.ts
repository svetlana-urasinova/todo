export interface Task {
  id: string;
  category?: TaskCaterogy;
  title: string;
  desc?: string;
  due_date?: Date;
  cost?: number;
  allowMultipleCompletitions?: boolean;
  period?: TaskPeriod;
  results: TaskResult[];
}

export interface TaskResult {
  userId: string;
  adminId?: string;
  approved?: boolean;
  amount?: number;
}

export interface TaskStatus {
  value: TaskStatusValue;
  icon?: string;
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

export enum TaskStatusValue {
  Done = 'done',
  Blocked = 'blocked',
  Approved = 'approved',
  Rejected = 'rejected',
  Default = 'default',
}
