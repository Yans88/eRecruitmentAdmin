import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from './layout/app.layout.module';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MyHttpInterceptor} from './core/my-http.interceptor';
import {registerLocaleData} from '@angular/common';
import localeId from '@angular/common/locales/id';
import {MessageService} from "primeng/api";

registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [AppRoutingModule, AppLayoutModule],
  providers: [
    {provide: localeId, useValue: "id-ID"},
    {provide: MessageService},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
