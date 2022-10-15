import { TaskPeriod } from '../../tasks';

export const periods = [
  {
    value: TaskPeriod.NoRepeat,
    name: 'Не повторяется',
  },
  {
    value: TaskPeriod.Day,
    name: 'Каждый день',
  },
  {
    value: TaskPeriod.Week,
    name: 'Раз в неделю',
  },
  {
    value: TaskPeriod.Month,
    name: 'Раз в месяц',
  },
  {
    value: TaskPeriod.Year,
    name: 'Раз в год',
  },
];
