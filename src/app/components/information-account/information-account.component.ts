import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Lang } from 'src/app/models/lang';
import { User, UserUpdate } from 'src/app/models/users';
import { LangService } from 'src/app/services/lang.service';
import { LoginDataService } from 'src/app/services/login-data.service';
import { SecurityService } from 'src/app/services/security.service';
import matchFieldsValidator from 'src/app/validators/matchFieldsValidator';
import { map } from 'rxjs';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-information-account',
  templateUrl: './information-account.component.html',
  styleUrls: ['./information-account.component.css']
})
export class InformationAccountComponent {

  formName: UntypedFormGroup = new UntypedFormGroup({
    userName: new UntypedFormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    userNameConfirm: new UntypedFormControl('')
  }, { validators: [matchFieldsValidator('userName', 'userNameConfirm') as ValidatorFn] })

  formEmail: UntypedFormGroup = new UntypedFormGroup({
    userEmail: new UntypedFormControl('', [Validators.required, Validators.email]),
    userEmailConfirm: new UntypedFormControl('')
  }, { validators: matchFieldsValidator('userEmail', 'userEmailConfirm') as ValidatorFn })

  formPhone: UntypedFormGroup = new UntypedFormGroup({
    userPhone: new UntypedFormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/), Validators.required]),
    userPhoneConfirm: new UntypedFormControl('')
  }, { validators: matchFieldsValidator('userPhone', 'userPhoneConfirm') as ValidatorFn })

  public modal = { title: '', type: '' }

  public user: User = new User()

  public lang: Lang = new Lang()

  public isVerify: boolean = true;
  constructor(public loginService: LoginDataService, private langService: LangService, private securityService: SecurityService, private toastr: ToastrService) {
    this.lang = this.langService.getLang()
    this.securityService.verifyAccount().subscribe({
      next: (data) => {
        this.isVerify = data.emailAlreadyVerified
      }
    })
  }

  public verifyAccountRequest(): void {
    this.securityService.verifyAccountRequest().subscribe({
      complete: () => {
        this.toastr.success(this.lang.toast.verify_accont_ok, this.lang.toast.status_complited)
      },
      error: () => {
        this.toastr.success(this.lang.toast.verify_accont_error, this.lang.toast.status_cancel)
      }
    })
  }

  public updateName(): void {
    const userUpdate = new UserUpdate();
    userUpdate.userName = this.formName.get('userNameConfirm')?.value;

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

  public updateEmail(): void {
    const userUpdate = new UserUpdate();
    userUpdate.userMail = this.formEmail.get('userEmailConfirm')?.value;

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

  public updatePhone(): void {
    const userUpdate = new UserUpdate();
    userUpdate.phoneNumber = this.formPhone.get('userPhoneConfirm')?.value;

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

  public editNameModal(): void {
    this.modal.title = this.lang.change_user_name;
    this.modal.type = 'name'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  public editEmailModal(): void {
    this.modal.title = this.lang.change_email_address;
    this.modal.type = 'email'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  public editPhoneModal(): void {
    this.modal.title = this.lang.change_phone;
    this.modal.type = 'phone'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  private reloadForms(): void {
    this.formName = new UntypedFormGroup({
      userName: new UntypedFormControl(),
      userNameConfirm: new UntypedFormControl()
    })

    this.formEmail = new UntypedFormGroup({
      userEmail: new UntypedFormControl(),
      userEmailConfirm: new UntypedFormControl()
    })
  }
}
