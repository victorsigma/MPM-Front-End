import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { Lang } from 'src/app/models/lang';
import { ProjectUserData } from 'src/app/models/projectsHasUser';
import { LangService } from 'src/app/services/lang.service';
import { ProjectDataService } from 'src/app/services/project-data.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent {
  public memberData: ProjectUserData[] = [];

  public searchTerm: string = '';
  public lang: Lang = new Lang();
  constructor(public projectData: ProjectDataService, private route: ActivatedRoute, private langService: LangService) {
    
    this.lang = this.langService.getLang();
  }

  ngOnInit(): void {
    const { idProject } = this.route.snapshot.params
    const loadScreenModal = new Modal(document.getElementById('loadScreen') as Element);
    loadScreenModal.show(document.body);
    this.projectData.getListProjectUser(idProject).subscribe({
      next: (data: any) => {
        this.memberData = data;
      }, 
      complete: () => {
        loadScreenModal.hide();
      },
      error: () => {
        loadScreenModal.hide();
      }
    })
  }

  get filteredMembers(): ProjectUserData[] {
    return this.memberData.filter(members =>
      members.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      members.rolName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
