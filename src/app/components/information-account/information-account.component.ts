import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Lang } from 'src/app/models/lang';
import { User, UserUpdate } from 'src/app/models/users';
import { LangService } from 'src/app/services/lang.service';
import { LoginDataService } from 'src/app/services/login-data.service';
import matchFieldsValidator from 'src/app/validators/matchFieldsValidator';

@Component({
  selector: 'app-information-account',
  templateUrl: './information-account.component.html',
  styleUrls: ['./information-account.component.css']
})
export class InformationAccountComponent {

  formName: UntypedFormGroup = new UntypedFormGroup({
    userName: new UntypedFormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    userNameConfirm: new UntypedFormControl()
  }, {validators: [matchFieldsValidator('userName', 'userNameConfirm') as ValidatorFn]})

  formEmail: UntypedFormGroup = new UntypedFormGroup({
    userEmail: new UntypedFormControl('', [Validators.required, Validators.email]),
    userEmailConfirm: new UntypedFormControl()
  }, {validators: matchFieldsValidator('userEmail', 'userEmailConfirm') as ValidatorFn})

  formPhone: UntypedFormGroup = new UntypedFormGroup({
    userPhone: new UntypedFormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/), Validators.required]),
    userPhoneConfirm: new UntypedFormControl()
  }, {validators: matchFieldsValidator('userPhone', 'userPhoneConfirm') as ValidatorFn})

  public modal = { title: '', type: '' }

  public user: User = new User()

  public lang: Lang = new Lang()
  constructor(public loginService: LoginDataService, private langService: LangService) {
    this.lang = this.langService.getLang()
  }

  updateName() {
    const userUpdate = new UserUpdate();
    userUpdate.userName = this.formName.get('userNameConfirm')?.value;

    this.loginService.updateUser(userUpdate).subscribe((data) => {
      this.loginService.setToken(data);
    })
  }

  updateEmail() {
    const userUpdate = new UserUpdate();
    userUpdate.userMail = this.formEmail.get('userEmailConfirm')?.value;

    this.loginService.updateUser(userUpdate).subscribe((data) => {
      this.loginService.setToken(data);
    })
  }

  updatePhone() {
    const userUpdate = new UserUpdate();
    userUpdate.phoneNumber = this.formPhone.get('userPhoneConfirm')?.value;

    this.loginService.updateUser(userUpdate).subscribe((data) => {
      this.loginService.setToken(data);
    })
  }

  editNameModal() {
    this.modal.title = this.lang.change_user_name;
    this.modal.type = 'name'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  editEmailModal() {
    this.modal.title = this.lang.change_email_address;
    this.modal.type = 'email'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  editPhoneModal() {
    this.modal.title = this.lang.change_phone;
    this.modal.type = 'phone'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  reloadForms() {
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
