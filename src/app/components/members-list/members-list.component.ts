import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { ProjectUserData } from 'src/app/models/projectsHasUser';
import { ProjectDataService } from 'src/app/services/project-data.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent {
  public memberData: ProjectUserData[] = [];

  constructor(public projectData: ProjectDataService, private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    const { idProject } = this.route.snapshot.params
    const loadScreenModal = new Modal(document.getElementById('loadScreen') as Element);
    loadScreenModal.show(document.body);
    this.projectData.getListProjectUser(idProject).subscribe((data: any) => {
      this.memberData = data;
    }, null, () => {
      loadScreenModal.hide();
    })
  }
}
