import { USER_API_URLS } from './index.constants';
import { ajaxGet, ajaxMultipartForm, ajaxPost } from '@/shared/api';
import { IUpdateProfileBody, IUserResponse } from './index.types';

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

export async function updateProfile(body: IUpdateProfileBody) {
    return ajaxPost<null>(USER_API_URLS.updateProfile, [], {
        fullName: body.fullName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        imgSrc: '',
    });
}

export async function uploadProfilePicture(formData: FormData) {
    return ajaxMultipartForm('POST', USER_API_URLS.updatePicture, formData);
}
