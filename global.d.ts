declare module '*.module.scss' {
    interface IClassNames {
        [classNames: string]: string;
    }

    const classNames: IClassNames;
    export = classNames;
}

declare module '*.pug' {
    type TmplFunc = {
        description: string;
        (args?: object): string;
    };

    const value: TmplFunc;
    export = value;
}

declare const PLATFORM: 'mobile' | 'desktop';
