export interface IUserResponse {
    id: number;
    fullName: string;
    avatarName: string;
    email: string;
    phoneNumber: string;
}

export interface IUpdateProfileBody {
    fullName: string;
    email: string;
    phoneNumber: string;
}
