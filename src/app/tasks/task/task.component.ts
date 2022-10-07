import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { UserService } from 'src/shared/services/user.service';
import { Task, User } from 'src/shared/types';
import dayjs from 'dayjs';

@Component({
  standalone: true,
  imports: [CommonModule, PipesModule],
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() public task: Task;

  public iconBaseUrl = '/assets/img/icons/';
  public defaultIcon = 'other';

  public isOutdated = false;
  public doneUsers: User[] = [];
  public approvedUsers: User[] = [];

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    if (this.task.done) {
      this.doneUsers = this.userService.getUsers(this.task.done);
    }

    if (this.task.approved) {
      this.approvedUsers = this.userService.getUsers(this.task.approved);
    }

    console.log(this.doneUsers);
    console.log(this.approvedUsers);

    if (dayjs(this.task.due_date).isBefore(dayjs())) {
      this.isOutdated = true;
    }
  }
}
