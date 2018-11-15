import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProgressInterceptor } from './interceptors/progress.interceptor';
import { TimingInterceptor } from './interceptors/timing.interceptors';
import { ProgressBarService } from './services/progress-bar.service';
import { AuthService } from './services';
import { AuthInterceptor } from './interceptors/auth.interceptors';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService] },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
