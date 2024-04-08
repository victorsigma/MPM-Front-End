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


export class UserUpdate {
    userName: string | undefined = undefined;
    userMail: string | undefined = undefined;
    password: string | undefined = undefined;
    phoneNumber: string | undefined = undefined;
}


export class Login {
    userNameOrEmail: string = '';
    password: string = '';
    verificationCode: string | null = null;
}

export class Jwt {
    token: string = '';
    message: string | null = null;
}