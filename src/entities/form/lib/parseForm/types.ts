export type FormData = {
    isValid: boolean;
    inputs: {
        [name: string]: {
            error: string | null;
            value: string | null;
        };
    };
};
