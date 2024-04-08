import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Lang } from 'src/app/models/lang';
import { UserUpdate } from 'src/app/models/users';
import { LangService } from 'src/app/services/lang.service';
import { LoginDataService } from 'src/app/services/login-data.service';
import { SecurityService } from 'src/app/services/security.service';
import matchFieldsValidator from 'src/app/validators/matchFieldsValidator';
import { error } from 'console';

@Component({
  selector: 'app-security-account',
  templateUrl: './security-account.component.html',
  styleUrls: ['./security-account.component.css']
})
export class SecurityAccountComponent {


  formPassword: UntypedFormGroup = new UntypedFormGroup({
    userPassword: new UntypedFormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z].*[a-zA-Z])[^'",{}\[\]\s]*$/)]),
    userPasswordConfirm: new UntypedFormControl('')
  }, {validators: matchFieldsValidator('userPassword', 'userPasswordConfirm') as ValidatorFn})

  public modal = { title: '', type: '' }
  public lang: Lang = new Lang()

  public isVerify: boolean | undefined = undefined;
  public isA2F: boolean | undefined = undefined;
  constructor(public loginService: LoginDataService, private langService: LangService, private securityService: SecurityService, private toastr: ToastrService) {
    this.lang = this.langService.getLang()
    this.securityService.verifyAccount().subscribe({
      next: (data) => {
        this.isVerify = data.emailAlreadyVerified
      }
    })
    
    this.securityService.verifyA2F().subscribe({
      next: (data) => {
        this.isA2F = data.authTwoVerified
      }
    })
  }

  updatePassword() {
    const userUpdate = new UserUpdate();
    userUpdate.password = this.formPassword.get('userPasswordConfirm')?.value;

    this.loginService.updateUser(userUpdate).subscribe({
      next: (data) => {
        this.toastr.success(this.lang.toast.update_ok, this.lang.toast.status_complited)
        this.loginService.setToken(data);
      },
      error: () => {
        this.toastr.error(this.lang.toast.update_error, this.lang.toast.status_cancel)
      }
    })
  }

  verifyAccountMessage() {
    this.toastr.info('Verifica tu correo electronico porfavor')
  }

  editPasswordModal() {
    this.modal.title = this.lang.change_password;
    this.modal.type = 'password'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  enableA2FModal() {
    const enableA2FModal = new Modal(document.getElementById('enableA2F') as Element);
    enableA2FModal.show(document.body)
  }

  disableA2FModal() {
    const disableA2FModal = new Modal(document.getElementById('disableA2F') as Element);
    disableA2FModal.show(document.body)
  }

  enableA2F() {
    this.securityService.enableA2F().subscribe({
      complete: () => {
        this.toastr.success(this.lang.toast.enable_a2f_ok, this.lang.toast.status_complited);
        this.isA2F = true;
      },
      error: (error) => {
        this.toastr.error(this.lang.toast.enable_a2f_error, this.lang.toast.status_cancel);
      }
    })
  }


  disableA2F() {
    this.securityService.disableA2F().subscribe({
      complete: () => {
        this.toastr.success(this.lang.toast.disable_a2f_ok, this.lang.toast.status_complited);
        this.isA2F = false;
      },
      error: (error) => {
        this.toastr.error(this.lang.toast.disable_a2f_error, this.lang.toast.status_cancel);
      }
    })
  }

  reloadForms() {
    this.formPassword = new UntypedFormGroup({
      userPassword: new UntypedFormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z].*[a-zA-Z])[^'",{}\[\]\s]*$/)]),
      userPasswordConfirm: new UntypedFormControl('')
    }, {validators: matchFieldsValidator('userPassword', 'userPasswordConfirm') as ValidatorFn})
  }
}
