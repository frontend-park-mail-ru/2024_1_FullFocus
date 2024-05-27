export interface ProfileInfoProps {
    className: string;
    navigateToMain: () => void;
    profileChangedCallback?: () => void;
    promocodesAvailable?: number;
    unreadNotifications?: number;
}
