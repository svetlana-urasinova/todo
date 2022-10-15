import { Injectable } from '@angular/core';
import { User } from '../types';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User;

  public constructor(private readonly userService: UserService) {
    const currentUser = this.userService.getUser('1');
    this.currentUser = currentUser || this.userService.createDefaultUser();
  }

  public getUserId(): string {
    return this.currentUser.id;
  }

  public checkIfAdmin(): boolean {
    return !!this.currentUser.isAdmin;
  }
}
