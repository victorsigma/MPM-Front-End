import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Lang } from 'src/app/models/lang';
import { UserUpdate } from 'src/app/models/users';
import { LangService } from 'src/app/services/lang.service';
import { LoginDataService } from 'src/app/services/login-data.service';
import matchFieldsValidator from 'src/app/validators/matchFieldsValidator';

@Component({
  selector: 'app-security-account',
  templateUrl: './security-account.component.html',
  styleUrls: ['./security-account.component.css']
})
export class SecurityAccountComponent {


  formPassword: UntypedFormGroup = new UntypedFormGroup({
    userPassword: new UntypedFormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9]).{6,}$/)]),
    userPasswordConfirm: new UntypedFormControl()
  }, {validators: matchFieldsValidator('userPassword', 'userPasswordConfirm') as ValidatorFn})

  public modal = { title: '', type: '' }
  public lang: Lang = new Lang()

  constructor(public loginService: LoginDataService, private langService: LangService) {
    this.lang = this.langService.getLang();
  }

  updatePassword() {
    const userUpdate = new UserUpdate();
    userUpdate.password = this.formPassword.get('userPasswordConfirm')?.value;

    this.loginService.updateUser(userUpdate).subscribe((data) => {
      this.loginService.setToken(data);
    })
  }

  editPasswordModal() {
    this.modal.title = this.lang.change_password;
    this.modal.type = 'password'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  reloadForms() {
    this.formPassword = new UntypedFormGroup({
      userPassword: new UntypedFormControl(),
      userPasswordConfirm: new UntypedFormControl()
    })
  }
}
