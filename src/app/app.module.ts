import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from 'src/shared/pipes/pipes.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [AppComponent, TasksComponent],
  imports: [BrowserModule, AppRoutingModule, PipesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
