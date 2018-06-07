import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TestComponent } from './app.component';

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  entryComponents: [
    TestComponent
  ]
})
export class TestModule {
  ngDoBootstrap(app: ApplicationRef) {}
}
