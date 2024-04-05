import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';
import { LoginDataService } from 'src/app/services/login-data.service';
import matchFieldsValidator from 'src/app/validators/matchFieldsValidator';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {
  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z].*[a-zA-Z])[^'",{}\[\]\s]*$/)]),
    newPassword: new FormControl('')
  }, {validators: matchFieldsValidator('password', 'newPassword') as ValidatorFn});
  appIcon: string = '';
  public lang: Lang = new Lang();

  constructor(private titleService: Title, private langService: LangService, private loginService: LoginDataService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.appIcon = document.body.getAttribute('data-bs-theme') == 'default' ? 'assets/img/mpm-logo-dark.png' : 'assets/img/mpm-logo-light.png';
    this.titleService.setTitle(`MPM - Password Recovery`)
    this.lang = this.langService.getLang();
  }

  submitForm(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];

      const password = this.form.get('newPassword')?.value;
      const req = {
        password: password
      }

      this.loginService.passwordRecoveryReset(req, token).subscribe({
        next: () => {
          this.toastr.success(this.lang.toast.update_ok, this.lang.toast.status_complited)
        },
        complete: () => {
          this.router.navigate(['/login'])
        },
        error: () => {
          this.toastr.error(this.lang.toast.update_error, this.lang.toast.status_cancel)
        }
      })
    })
  }
}
