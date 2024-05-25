import { USER_API_URLS } from './index.constants';
import {
    ajaxGet,
    ajaxMultipartForm,
    ajaxPost,
    fetchPicture,
} from '@/shared/api';
import {
    IMainUserInfoResponse,
    IUpdateProfileBody,
    IUserResponse,
    NotificationResponse,
} from './index.types';

export async function checkAuthRequest() {
    return ajaxGet(USER_API_URLS.checkAuth, null);
}

export async function signupRequest(login: string, password: string) {
    return ajaxPost(USER_API_URLS.signup, null, {
        login: login,
        password: password,
    });
}

export async function loginRequest(login: string, password: string) {
    return ajaxPost(USER_API_URLS.login, null, {
        login: login,
        password: password,
    });
}

export async function logoutRequest() {
    return ajaxPost(USER_API_URLS.logout, null, null);
}

export async function getUserData() {
    return ajaxGet<IUserResponse>(USER_API_URLS.userData, []);
}

export async function getMainUserData() {
    return ajaxGet<IMainUserInfoResponse>(USER_API_URLS.mainUserInfo, []);
}

export async function updateProfile(body: IUpdateProfileBody) {
    return ajaxPost<null>(USER_API_URLS.updateProfile, [], {
        fullName: body.fullName,
        email: body.email,
        phoneNumber: body.phoneNumber,
    });
}

export async function getProfilePicture(id: string) {
    return fetchPicture(USER_API_URLS.getPicture + id);
}

export async function uploadProfilePicture(formData: FormData) {
    return ajaxMultipartForm('POST', USER_API_URLS.updatePicture, formData);
}

export async function sendCsatData(quesiontId: number, rate: number) {
    return ajaxPost<null>(USER_API_URLS.sendCsat, [], {
        pollID: quesiontId,
        rate: rate,
    });
}

export async function getAllNotifications() {
    return ajaxGet<NotificationResponse[]>(
        USER_API_URLS.getNotificationsAll,
        [],
    );
}

export async function getAllCsat() {
    return ajaxGet<{ id: number; title: string }[]>(USER_API_URLS.allCsat, []);
}

export async function getCsatStat(questionId: number) {
    return ajaxGet<{
        title: string;
        amount: number;
        stats: number[];
    }>(USER_API_URLS.csatStat + questionId.toString(), []);
}
