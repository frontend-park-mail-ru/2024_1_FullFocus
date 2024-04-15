import { getUserData, getProfilePicture } from '@/entities/user/api';
import { IProfile } from './index.types';

export async function useGetProfileInfo() {
    const [userData, profilePicture] = await Promise.all([
        getUserData(),
        getProfilePicture(),
    ]);

    // TODO remove console log
    console.log(userData);
    console.log(profilePicture);

    const imgSrc = URL.createObjectURL(profilePicture);
    console.log(imgSrc);

    if (userData.status === 200) {
        const profileData: IProfile = {
            fullName: userData.data.fullName,
            email: userData.data.email,
            phoneNumber: userData.data.phoneNumber,
            pictureSrc: imgSrc,
        };

        return profileData;
    }

    return { fullName: '', email: '', phoneNumber: '', pictureSrc: '' };
}
