import { checkAuthRequest } from '@/entities/user';

export async function useCheckUserLogin() {
    const status = (await checkAuthRequest()).status;
    return status === 200;
}
