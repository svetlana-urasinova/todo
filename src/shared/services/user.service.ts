import { Injectable } from '@angular/core';
import { User } from '../types';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    {
      id: '1',
      name: 'Алексей',
      email: 'alexei.urasinov@gmail.com',
    },
    {
      id: '2',
      name: 'Антон',
      email: 'tony.urasinov@gmail.com',
    },
    {
      id: '3',
      name: 'Лана',
      email: 'urasinova.work@gmail.com',
      isAdmin: true,
    },
    {
      id: '4',
      name: 'Паша',
      email: 'aeli.mill@gmail.com',
      isAdmin: true,
    },
  ];

  public getUser(id: string): User | null {
    return this.users.find((user: User) => user.id === id) || null;
  }

  public getUsers(ids: string[]): User[] {
    return ids.reduce((users: User[], userId: string) => {
      const user = this.getUser(userId);
      return user ? [...users, user] : users;
    }, []);
  }

  public createDefaultUser(): User {
    return { id: '', name: 'Безымянный пользователь', email: '' };
  }
}
