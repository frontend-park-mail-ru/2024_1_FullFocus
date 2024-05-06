export interface ProfilePageProps {
    className: string;
    profilePageName?: string;
    navigateToMain: () => void;
    params?: { [name: string]: string };
}
