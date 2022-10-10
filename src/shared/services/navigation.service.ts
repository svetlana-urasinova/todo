import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  public getIconBaseUrl(): string {
    return '/assets/img/icons/';
  }
}
