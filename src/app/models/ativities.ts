import { RolesListActivity } from './roles';
export class ActivityData {
    id: number = 0;
    title: string = '';
    subtitle:string = '';
    src:string = '';
    status: number = 0;
    dateEnd: Date = new Date();
    rolesList: RolesListActivity =  new RolesListActivity(true,false,false,false);
    projectId: number = 0;
    
}