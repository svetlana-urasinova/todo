import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../types';

@Pipe({
  name: 'usernames',
})
export class UsernamesPipe implements PipeTransform {
  transform(users: User[]): string {
    return users.map((user: User) => user.name).join(', ');
  }
}
