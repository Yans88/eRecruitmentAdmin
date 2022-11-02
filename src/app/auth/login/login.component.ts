import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {MySessionService} from '../my-session.service';
import {Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.scss'],
  styles: [
    `
      :host ::ng-deep .p-password input {
        width: 100%;
        padding: 1rem;
      }

      :host ::ng-deep .pi-eye {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }

      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm!: FormGroup;
  private ngUnsubsribe = new Subject();
  isLoading: boolean = false;

  constructor(
    public route: Router,
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    public sessionService: MySessionService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }


  onSubmit(): void {
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe((res) => {
        if (res) {
          localStorage.setItem('jwt_token', res?.data.accessToken);
          this.sessionService.createSession(res?.data);
          this.route.navigate(['']);
          this.isLoading = false;
        }else{
          this.isLoading = false;
        }
      });

  }
}
