import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { error } from 'console';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';
import { LoginDataService } from 'src/app/services/login-data.service';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.css']
})
export class PasswordRecoveryFormComponent {


  form: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.email])
  });
  appIcon: string = '';
  public lang: Lang = new Lang();

  constructor(private titleService: Title, private langService: LangService, private loginService: LoginDataService) {
    this.appIcon = document.body.getAttribute('data-bs-theme') == 'default' ? 'assets/img/mpm-logo-dark.png' : 'assets/img/mpm-logo-light.png';
    this.titleService.setTitle(`MPM - Password Recovery`)
    this.lang = this.langService.getLang();

    this.form.get('userName')?.valueChanges.subscribe(value => {
      const validators = this.getUserNameValidators(value);
      this.form.get('userName')?.setValidators(validators);
      this.form.get('userName')?.updateValueAndValidity();
    });
  }

  getUserNameValidators(value: string) {
    // Determina dinámicamente los validadores según el tipo de entrada (correo o nombre de usuario)
    return value.includes('@')
      ? [Validators.email, Validators.required]
      : [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9]+$/)];
  }

  submitForm(): void {
    const userNameOrEmail = this.form.get('userName')?.value;
    const req = {
      userNameOrEmail: userNameOrEmail
    }

    this.loginService.passwordRecoveryRequest(req).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
