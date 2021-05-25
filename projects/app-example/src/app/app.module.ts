import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInitService } from './app-init.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      deps: [AppInitService],
      multi: true
    },
    { provide: APP_INITIALIZER, useFactory: initializeApp2, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// tslint:disable-next-line:typedef
export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  };
}
// tslint:disable-next-line:typedef
export function initializeApp2() {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      console.log(`initializeApp2 called`);
      setTimeout(() => {
        console.log(`initializeApp2 Finished`);
        resolve(null);
      }, 2000);
    });
  };
}
