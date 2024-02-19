export class UserData {
    userId: string = '';
    userName: string = '';
    password: string = '';
    userMail: string = '';
    phoneNumber: string = '';
}

export class User {
    userName: string = '';
    userMail: string = '';
    phoneNumber: string = '';
    userIcon: string = '';
    selectedTheme: string = '';
}

export class Login {
    userNameOrEmail: string = '';
    password: string = '';
}

export class Jwt {
    token: string = '';
}