export interface ButtonProps {
    className: string;
    type: string;
    btnText?: string;
    btnIconFunc?: (props?: object) => string;
    btnStyle: 'whiteWithBg' | 'bright' | 'green' | 'white';
    toggle?: {
        btnText?: string;
        btnIconFunc?: (props?: object) => string;
    };
}
