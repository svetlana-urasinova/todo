import { Component, OnInit } from '@angular/core';
import {
  CategoryPipe,
  DateOrTimePipe,
  PeriodPipe,
  TaskStatusPipe,
  TimePipe,
  UsernamesPipe,
} from 'src/shared/pipes';
import { TaskCategory, TaskPeriod, TaskStatusValue } from 'src/shared/types';
import { DemoCardComponent } from '../../layout/demo-card/demo-card.component';
import { DemoExampleComponent } from '../../layout/demo-example/demo-example.component';

@Component({
  standalone: true,
  imports: [
    DemoCardComponent,
    DemoExampleComponent,
    CategoryPipe,
    DateOrTimePipe,
    PeriodPipe,
    TaskStatusPipe,
    TimePipe,
    UsernamesPipe,
  ],
  selector: 'app-demo-pipes',
  templateUrl: './demo-pipes.component.html',
  styleUrls: ['./demo-pipes.component.scss'],
})
export class DemoPipesComponent implements OnInit {
  public taskCategory = TaskCategory;
  public taskPeriod = TaskPeriod;
  public taskStatus = TaskStatusValue;

  public users = [
    { id: '1', name: 'Petyr', email: 'peter.baelish@test.com' },
    { id: '2', name: 'John', email: 'john.snow@test.com' },
  ];

  public date = new Date('2022-09-01');
  public dateWithTime = new Date();

  constructor() {}

  ngOnInit(): void {}
}
