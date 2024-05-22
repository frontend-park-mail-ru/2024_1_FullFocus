export interface ButtonProps {
    className: string;
    type: string;
    btnText?: string;
    btnIconFunc?: (props?: object) => string;
    btnStyle: 'whiteWithBg' | 'bright' | 'green' | 'white' | 'red';
    size?: 'sm' | 'xs' | 'xs-only' | 'bg';
    toggle?: {
        btnText?: string;
        btnIconFunc?: (props?: object) => string;
    };
}
