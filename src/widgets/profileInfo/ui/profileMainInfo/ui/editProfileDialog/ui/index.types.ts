export interface EditProfileDialogProps {
    className: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profileChangedCallback?: (
        fullName: string,
        email: string,
        phoneNumber: string,
    ) => void;
}
