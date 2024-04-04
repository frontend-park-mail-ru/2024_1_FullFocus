import { DataResponce } from '@/shared/api/ajax/index.types';
import { IUser } from '../model';
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

export async function getUserData() {
    // TODO real request
    console.log('hui');
    return new Promise<DataResponce<IUser>>((resolve, reject) => {
        const userData: DataResponce<IUser> = {
            status: 200,
            data: {
                id: 2,
                name: 'Сергей',
                surname: 'Пупкович',
                username: 'pupok_sergey14',
                pictureSrc: './default-profile-pic.png',
            },
        };
        resolve(userData);
    });
}
