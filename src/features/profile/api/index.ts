import { getUserData, getProfilePicture } from '@/entities/user/api';
import { IProfile } from './index.types';

export async function useGetProfileInfo() {
    const userData = await getUserData();

    if (userData.status === 200) {
        let imgSrc = '';

        if (userData.data.avatarName.length > 0) {
            const profilePicture = await getProfilePicture(
                userData.data.avatarName,
            );

            if (profilePicture.status === 200) {
                imgSrc = URL.createObjectURL(profilePicture.data);
            }
        }

        const profileData: IProfile = {
            fullName: userData.data.fullName,
            email: userData.data.email,
            phoneNumber: userData.data.phoneNumber,
            pictureSrc: imgSrc,
            login: userData.data.login,
        };

        return profileData;
    }

    return { fullName: '', email: '', phoneNumber: '', pictureSrc: '' };
}
