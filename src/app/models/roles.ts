export class RolesListActivity {
    Leader: boolean =  true;
    Analyst: boolean =  true;
    Designer: boolean = true;
    Programmer: boolean = true;
    constructor (l:boolean,a:boolean,d:boolean,p:boolean) {
        this.Leader =  l;
        this.Analyst =  a;
        this.Designer = d;
        this.Programmer = p;
    };
    
}