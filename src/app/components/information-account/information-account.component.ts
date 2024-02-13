import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { User } from 'src/app/models/users';
import { LoginDataService } from 'src/app/services/login-data.service';
import matchFieldsValidator from 'src/app/validators/matchFieldsValidator';

@Component({
  selector: 'app-information-account',
  templateUrl: './information-account.component.html',
  styleUrls: ['./information-account.component.css']
})
export class InformationAccountComponent {

  formName: UntypedFormGroup = new UntypedFormGroup({
    userName: new UntypedFormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    userNameConfirm: new UntypedFormControl()
  }, {validators: [matchFieldsValidator('userName', 'userNameConfirm') as ValidatorFn]})

  formEmail: UntypedFormGroup = new UntypedFormGroup({
    userEmail: new UntypedFormControl('', [Validators.required, Validators.email]),
    userEmailConfirm: new UntypedFormControl()
  }, {validators: matchFieldsValidator('userEmail', 'userEmailConfirm') as ValidatorFn})

  formPhone: UntypedFormGroup = new UntypedFormGroup({
    userPhone: new UntypedFormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]),
    userPhoneConfirm: new UntypedFormControl()
  }, {validators: matchFieldsValidator('userPhone', 'userPhoneConfirm') as ValidatorFn})

  public modal = { title: '', type: '' }

  public user: User = new User()

  constructor(public loginService: LoginDataService) {

  }

  updateName() {
    /*if(!(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.formName.get('userName')?.value))) {
      if (this.formName.get('userName')?.value === this.formName.get('userNameConfirm')?.value) {
        if (this.userList.usersList.filter(data => {
          return data.userName === this.formName.get('userNameConfirm')?.value
        }).length == 0) {
          //this.userList.usersList[this.userList.usersList.indexOf(this.loginData.usersList[0])].userName = this.formName.get('userNameConfirm')?.value;
          this.loginData.usersList[0].userName = this.formName.get('userNameConfirm')?.value;
  
          this.userList.updateUser(this.loginData.usersList[0].userId, this.loginData.usersList[0]).subscribe(data => {
            this.toastr.info('Successfully registered.', 'Operation Completed');
            this.reloadForms();
          })
        } else {
          this.reloadForms();
          this.toastr.error('Exists Username.', 'Operation Canceled');
        }
      } else {
        this.reloadForms();
        this.toastr.error('Incorrect data.', 'Operation Canceled');
      }
    } else {
      this.toastr.error('You cannot use an email address as a user.', 'Operation Canceled');
    }*/
  }

  updateEmail() {
    /*if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.formEmail.get('userEmail')?.value)) {
      if (this.formEmail.get('userEmail')?.value === this.formEmail.get('userEmailConfirm')?.value) {
        if (this.userList.usersList.filter(data => {
          return data.userMail === this.formEmail.get('userEmailConfirm')?.value
        }).length == 0) {
          //this.userList.usersList[this.userList.usersList.indexOf(this.loginData.usersList[0])].userMail = this.formEmail.get('userEmailConfirm')?.value;
          this.loginData.usersList[0].userMail = this.formEmail.get('userEmailConfirm')?.value;

          this.userList.updateUser(this.loginData.usersList[0].userId, this.loginData.usersList[0]).subscribe(data => {
            this.toastr.info('Successfully registered.', 'Operation Completed');
            this.reloadForms();
          })
        } else {
          this.toastr.error('Exists Email.', 'Operation Canceled');
        }
      } else {
        this.reloadForms();
        this.toastr.error('Incorrect data.', 'Operation Canceled');
      }
    } else {
      this.reloadForms();
      this.toastr.error('Incorrect data.', 'Operation Canceled');
    }*/
  }

  editNameModal() {
    this.modal.title = 'Confirm user name change';
    this.modal.type = 'name'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  editEmailModal() {
    this.modal.title = 'Confirm user email change';
    this.modal.type = 'email'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  editPhoneModal() {
    this.modal.title = 'Confirm user phone change';
    this.modal.type = 'phone'
    const editModal = new Modal(document.getElementById('editModal') as Element);
    editModal.show(document.body)
  }

  updatePhone() {}

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
