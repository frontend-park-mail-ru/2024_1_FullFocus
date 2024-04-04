import { Component } from '@/shared/@types/index.component';

export interface Page {
    url: string;
    navigation: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: (...args: any) => Component<Element>;
}
