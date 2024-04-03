import { signupRequest } from '@/entities/user';

export async function useSignupUser(login: string, password: string) {
    const { status, msgRus } = await signupRequest(login, password);
    return { status, msgRus };
}
