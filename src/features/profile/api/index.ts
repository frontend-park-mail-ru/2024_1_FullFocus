import { getUserData } from '@/entities/user/api';
import { IProfile } from './index.types';

// TODO make it real
export async function useGetProfileInfo() {
    const userData = await getUserData();
    if (userData.status === 200) {
        const profileData: IProfile = {
            login: userData.data.username,
            name: userData.data.name,
            surname: userData.data.surname,
            pictureSrc: userData.data.pictureSrc,
        };

        return profileData;
    }

    return { login: '', name: '', surname: '', pictureSrc: '' };
}
