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

export enum TaskStatusValue {
  Done = 'done',
  Blocked = 'blocked',
  Approved = 'approved',
  Rejected = 'rejected',
  Default = 'default',
}

export class TaskStatus {
  static readonly Approved = new TaskStatus(
    TaskStatusValue.Approved,
    'Одобрено',
    'check.svg'
  );
  static readonly Blocked = new TaskStatus(
    TaskStatusValue.Blocked,
    'Уже сделано',
    'not-allowed.svg'
  );
  static readonly Done = new TaskStatus(
    TaskStatusValue.Done,
    'Одобрено',
    'check.svg'
  );
  static readonly Rejected = new TaskStatus(
    TaskStatusValue.Rejected,
    'Отклонено',
    'cross.svg'
  );
  static readonly Default = new TaskStatus(TaskStatusValue.Default, '', null);

  private constructor(
    public readonly value: TaskStatusValue,
    public readonly text: string,
    public readonly icon: string | null
  ) {}
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
