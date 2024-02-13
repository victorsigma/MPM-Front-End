
export class ProjectUserData {
    userName: string = '';
    userIcon: string = '';
    rolName: string = '';
}

export class ProjectsHasUser {
    id: number = 0;
    proyectsIdProject: string = '';
    userIdUser: string = '';
    rolesIdRol: number = 0;
}

export class PostProjectsHasUser {
    idProject: string = '';
    userNameOrEmail: string = '';
    idRol: number = 0;
}