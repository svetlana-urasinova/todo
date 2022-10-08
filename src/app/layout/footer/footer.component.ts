import { Component } from '@angular/core';
import { LinkComponent } from 'src/shared/components';

@Component({
  standalone: true,
  imports: [LinkComponent],
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
