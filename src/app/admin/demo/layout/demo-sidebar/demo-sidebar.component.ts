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
      { title: 'Button', url: 'components/button' },
      { title: 'Checkbox', url: 'components/checkbox' },
      { title: 'Link', url: 'components/link' },
      { title: 'Date', url: 'components/date' },
      { title: 'Error', url: 'components/error' },
      { title: 'Input', url: 'components/input' },
      { title: 'Img', url: 'components/img' },
    ];

    this.items = orderBy(items, ['title'], ['asc']);
  }
}
