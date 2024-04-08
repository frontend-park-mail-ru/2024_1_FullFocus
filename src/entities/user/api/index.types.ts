export interface IUserResponse {
    id: number;
    fullName: string;
    imgSrc: string;
    email: string;
    phoneNumber: string;
}

export interface IUpdateProfileBody {
    fullName: string;
    email: string;
    phoneNumber: string;
}
