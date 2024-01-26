export class ActivityData {
    id: string = '';
    title: string = '';
    subtitle:string = '';
    src:string = '';
    status: number = 0;
    dateEnd: Date = new Date();
    leader: boolean =  true;
    analyst: boolean =  false;
    designer: boolean = false;
    programmer: boolean = false;
    projectId: string = '';
}


export class activityStatusData {
    Id: number = 0;
    statusName: string = '';
}