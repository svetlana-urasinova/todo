import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UsernamesPipe } from 'src/shared/pipes';
import { Task, User } from 'src/shared/types';

@Component({
  standalone: true,
  imports: [CommonModule, UsernamesPipe],
  selector: 'app-task-results',
  templateUrl: './task-results.component.html',
  styleUrls: ['./task-results.component.scss'],
})
export class TaskResultsComponent {
  @Input() task: Task;
  @Input() doneByUsers: User[];
  @Input() approvedFor: User[];
  @Input() rejectedFor: User[];
}
