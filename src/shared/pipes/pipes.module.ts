import { NgModule } from '@angular/core';
import { DateOrTime } from './date-or-time.pipe';
import { TimePipe } from './time.pipe';
import { UsernamesPipe } from './usernames.pipe';

@NgModule({
  declarations: [DateOrTime, TimePipe, UsernamesPipe],
  exports: [DateOrTime, TimePipe, UsernamesPipe],
})
export class PipesModule {}
