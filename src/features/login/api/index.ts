import { loginRequest } from '@/entities/user';

export async function useLoginUser(login: string, password: string) {
    const { status, msgRus } = await loginRequest(login, password);
    return { status, msgRus };
}
