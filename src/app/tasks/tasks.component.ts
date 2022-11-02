import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/shared/services';
import { AppState } from 'src/shared/store';
import { getTasks } from 'src/shared/store/tasks/tasks.selector';
import { Task } from 'src/shared/types';
import { TaskComponent } from './task/task.component';

@Component({
  standalone: true,
  imports: [CommonModule, TaskComponent],
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public tasks: Observable<Task[]>;

  public userId: string;
  public isAdmin = false;

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.tasks = this.store.select(getTasks);

    this.userId = this.authService.getUserId();
    this.isAdmin = this.authService.checkIfAdmin();
  }
}
