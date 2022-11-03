import { Component, OnInit } from '@angular/core';
import { LinkComponent } from 'src/shared/components';

@Component({
  standalone: true,
  imports: [LinkComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
