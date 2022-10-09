import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ImgComponent } from 'src/shared/components';
import { AuthService, NavigationService } from 'src/shared/services';
import { Task, TaskStatus } from 'src/shared/types';

@Component({
  standalone: true,
  imports: [CommonModule, ImgComponent],
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
})
export class TaskHeaderComponent implements OnInit {
  @Input() public task: Task;
  @Input() public status: TaskStatus;

  public taskStatus = TaskStatus;

  public iconBaseUrl: string;
  public defaultIcon = 'other';

  public isAdmin = false;

  public constructor(
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService
  ) {}

  public ngOnInit(): void {
    this.iconBaseUrl = this.navigationService.getIconBaseUrl();
    this.isAdmin = this.authService.checkIfAdmin();
  }
}
