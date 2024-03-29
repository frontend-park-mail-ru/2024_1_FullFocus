import {
    checkAuthRequest,
    signupRequest,
    loginRequest,
    logoutRequest,
} from '@/entities/user';

export async function isUserLogged() {
    const status = (await checkAuthRequest()).Status;
    return status === 200;
}

export async function signupUser(form: HTMLFormElement) {
    const { Status, MsgRus } = await signupRequest(form);
    return { status: Status, msgRus: MsgRus };
}

export async function loginUser(form: HTMLFormElement) {
    const { Status, MsgRus } = await loginRequest(form);
    return { status: Status, msgRus: MsgRus };
}

export async function logoutUser() {
    return logoutRequest();
}
