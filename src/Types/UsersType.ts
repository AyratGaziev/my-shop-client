export type UserStateType = {
    username: string;
    id: string;
    roles: string[];
    showLogin: boolean;
    showRegister: boolean;
    userLoading: boolean;
    message: string;
};
export type regNewUserRequsetType = {
    username: string;
    password: string;
};
export type regNewUserResponseType = {
    message: string;
};
export type loginUserResponseType = {
    id: string;
    name: string;
    role: string[];
    token: string;
};
export type authCheckUserResponseType = {
    id: string;
    name: string;
    role: string[];
    token: string;
};
