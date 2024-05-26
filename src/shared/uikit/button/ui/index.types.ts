export interface ButtonProps {
    className: string;
    type: string;
    btnText?: string;
    btnIconFunc?: (props?: object) => string;
    btnStyle: 'whiteWithBg' | 'bright' | 'green' | 'white' | 'red';
    size?: 'sm' | 'xs' | 'bg' | 'no-padding';
    toggle?: {
        btnText?: string;
        btnIconFunc?: (props?: object) => string;
    };
}
