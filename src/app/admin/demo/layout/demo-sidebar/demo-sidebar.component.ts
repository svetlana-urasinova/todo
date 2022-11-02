import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LinkComponent } from 'src/shared/components';
import { MenuItem } from 'src/shared/types/menu-item';
import orderBy from 'lodash.orderby';

@Component({
  standalone: true,
  imports: [CommonModule, LinkComponent],
  selector: 'ad-demo-sidebar',
  templateUrl: './demo-sidebar.component.html',
  styleUrls: ['./demo-sidebar.component.scss'],
})
export class DemoSidebarComponent implements OnInit {
  public items: MenuItem[];

  public ngOnInit(): void {
    const items = [
      { title: 'Button', url: 'button' },
      { title: 'Checkbox', url: 'checkbox' },
      { title: 'Link', url: 'link' },
      { title: 'Date', url: 'date' },
      { title: 'Error', url: 'error' },
      { title: 'Input', url: 'input' },
      { title: 'Img', url: 'img' },
      { title: 'Pipes', url: 'pipes' },
    ];

    this.items = orderBy(items, ['title'], ['asc']);
  }
}
