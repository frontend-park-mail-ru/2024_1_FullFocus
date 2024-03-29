import { USER_API_URLS } from './constants';
import { ajaxGet, ajaxMultipartForm, ajaxPost } from '@/shared/api';

export async function checkAuthRequest() {
    return ajaxGet(USER_API_URLS.checkAuth, null);
}

export async function signupRequest(form: HTMLFormElement) {
    return ajaxMultipartForm('POST', USER_API_URLS.signup, form);
}

export async function loginRequest(form: HTMLFormElement) {
    return ajaxMultipartForm('POST', USER_API_URLS.login, form);
}

export async function logoutRequest() {
    return ajaxPost(USER_API_URLS.logout, null, null);
}
