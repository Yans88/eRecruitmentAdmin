import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from './login.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {AppComponent} from "../../app.component";
import {Location} from "@angular/common";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let btnEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{path: '', component: AppComponent}]
      )],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    btnEl = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Update tombol login menjadi true', () => {
    component.isLoading = true; // false
    fixture.detectChanges()
    expect(btnEl.nativeElement.isLoading).toBeFalsy();
  })

  it('form invalid ketika kosong', () => {
    expect(component.loginForm.valid).toBeFalsy()
  })

  it('form invalid email empty', () => {
    component.loginForm.setValue({
      email: '',
      password: '123123',
    })
    expect(component.loginForm.valid).toBeFalsy()
  })

  it('form invalid password empty', () => {
    component.loginForm.setValue({
      email: 'yansen@gmail.com',
      password: '',
    })
    expect(component.loginForm.valid).toBeFalsy()
  })

  it('form valid', () => {
    component.loginForm.setValue({
      email: 'yansen@gmail.com',
      password: '123123',
    })
    expect(component.loginForm.valid).toBeTruthy()
  })

  it('onsubmit login => success', () => {
    component.loginForm.setValue({
      email: 'yansen@gmail.com',
      password: '123123',
    })
    component.onSubmit();
    const location: Location = TestBed.inject(Location);
    expect(component.route.navigate).toBeTruthy()
    expect(component.sessionService).toBeTruthy();
    expect(location.path()).toBe('');
  })
});
