import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { replacePaths } from 'src/app/libs/paths';
import { PostProjectsHasUser } from 'src/app/models/projectsHasUser';
import { ProjectDataService } from 'src/app/services/project-data.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {
  public form: UntypedFormGroup = new UntypedFormGroup({
    userName: new UntypedFormControl(),
    userRole: new UntypedFormControl(1)
  });

  constructor(private router: Router, private projectData: ProjectDataService) {
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


  addMember() {
    const idProject = this.router.url.split('/')[2]
    
    const newMember: PostProjectsHasUser = {
      idProject: idProject,
      userNameOrEmail: this.form.get('userName')?.value,
      idRol: this.form.get('userRole')?.value
    };

    console.log(newMember)

    this.projectData.addProjectUser(newMember).subscribe(data => {
      this.router.navigate([replacePaths(this.router.url)])
    })

    this.form = new UntypedFormGroup({
      userName: new UntypedFormControl(),
      userRol: new UntypedFormControl(1)
    });
  }
}
