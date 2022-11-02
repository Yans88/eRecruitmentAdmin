import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {
}
