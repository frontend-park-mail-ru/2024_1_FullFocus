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

export interface IMainUserInfoResponse {
    fullName: string;
    cartItemsAmount: number;
    avatarName: string;
}

export type NotificationResponse = {
    id: number;
    readStatus: boolean;
    createdAt: string;
    type: string;
    payload: string;
};
