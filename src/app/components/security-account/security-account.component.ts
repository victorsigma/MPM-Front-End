import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
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

  constructor() {
    
  }

  updatePassword() {
    /*if (this.formPassword.get('userPassword')?.value === this.formPassword.get('userPasswordConfirm')?.value) {
      //this.userList.usersList[this.userList.usersList.indexOf(this.loginData.usersList[0])].password = AES.encrypt(this.formPassword.get('userPasswordConfirm')?.value, this.userList.encryptionKey).toString();

      this.loginData.usersList[0].password = AES.encrypt(this.formPassword.get('userPasswordConfirm')?.value, this.userList.encryptionKey).toString();

      this.userList.updateUser(this.loginData.usersList[0].userId, this.loginData.usersList[0]).subscribe(data => {
        this.toastr.info('Successfully registered.', 'Operation Completed');
        this.reloadForms();
      })
    } else {
      this.reloadForms();
      this.toastr.error('Incorrect data.', 'Operation Canceled');
    }*/
  }

  editPasswordModal() {
    this.modal.title = 'Confirm user password change';
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
