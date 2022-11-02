import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoSidebarComponent } from './layout/demo-sidebar/demo-sidebar.component';

@Component({
  standalone: true,
  imports: [RouterModule, DemoSidebarComponent],
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
