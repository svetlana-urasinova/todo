import { NgModule } from '@angular/core';
import { DateOrTime } from './date-or-time';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [TimePipe, DateOrTime],
  exports: [TimePipe, DateOrTime],
})
export class PipesModule {}
