import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/shared/store';
import { FooterComponent } from './layout/footer/footer.component';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  standalone: true,
  imports: [RouterModule, FooterComponent, TasksComponent],
  providers: [Store<AppState>],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';
}
