import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from 'src/app/services/auth.service';

import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';

@Component({
  selector: 'scan-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatSnackBarModule, MatIconModule, MatTooltipModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms]
})
export class LoginComponent {

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _changeDetector: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _authService: AuthService
  ) {}

  loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  inputType = 'password';
  pwdVisible = false;

  togglePwdVisibility() {
    if (this.pwdVisible) {
      this.inputType = 'password';
      this.pwdVisible = false;
      this._changeDetector.markForCheck();
    } else {
      this.inputType = 'text';
      this.pwdVisible = true;
      this._changeDetector.markForCheck();
    }
  }

  doLogin(formData:any) {
    if (this.loginForm.valid) {
      this._authService.userLogin(formData).subscribe(
        (data) => {
          switch (data.code) {
            case 400:
            case 401:
              this._snackBar.open(
                "Ops! Si è verificato un errore",
                'CHIUDI',
                {
                  duration: 3000,
                  panelClass: "snackbar-warning"
                }
              );
              break;
            case 200:
              this._router.navigate(['/']);
              break;
          }
        }
      );
    }
  }

}
