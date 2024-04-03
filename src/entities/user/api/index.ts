import { USER_API_URLS } from './index.constants';
import { ajaxGet, ajaxPost } from '@/shared/api';

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
