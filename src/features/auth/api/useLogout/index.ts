import { logoutRequest } from '@/entities/user';

export async function useLogoutUser() {
    return logoutRequest();
}
