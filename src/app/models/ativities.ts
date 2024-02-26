export class ActivityData {
    id: string = '';
    title: string = '';
    subtitle:string = '';
    src:string = '';
    status: number = 0;
    dateEnd: Date = new Date();
    leader: { data: Array<boolean> } = { data: [false]};
    analyst: { data: Array<boolean> } = { data: [false]};
    designer: { data: Array<boolean> } = { data: [false]};
    programmer: { data: Array<boolean> } = { data: [false]};
    projectId: string = '';
}

export class ActivityDataPost {
    id: string = '';
    title: string = '';
    subtitle:string = '';
    src:string = '';
    status: number = 0;
    dateEnd: Date = new Date();
    leader: boolean = false;
    analyst: boolean = false;
    designer: boolean = false;
    programmer: boolean = false;
    projectId: string = '';
}



export class activityStatusData {
    Id: number = 0;
    statusName: string = '';
}