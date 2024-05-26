import { Component } from '@/shared/@types/index.component';
import { Toast } from './ui';

function getToast() {
    let toast: Toast = null;

    const createToast = () => {
        toast = new Toast(document.getElementsByTagName('body')[0], {
            className: 'toast-main',
        });
    };

    return () => {
        if (toast === null) {
            createToast();
        }

        return {
            addMessage: (header: string, text: string) => {
                toast.addMessage(header, text, 'normal');
            },
            addMessageCustom: (
                header: string,
                component: (parent: Element) => Component<Element>,
            ) => {
                toast.addCustomMessage(header, 'normal', component);
            },
            addError: (header: string, text: string) => {
                toast.addMessage(header, text, 'error');
            },
            addSuccess: (header: string, text: string) => {
                toast.addMessage(header, text, 'success');
            },
        };
    };
}

export const toast = getToast();
