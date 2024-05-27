import messageTmpl from './index.template.pug';
import { EmptyContainer } from '@/shared/uikit/emptyContainer';

export function getNotificationMessage(
    parent: Element,
    className: string,
    orderId: string,
    newStatus: string,
) {
    const messageDiv = new EmptyContainer(parent, { className: className });
    messageDiv.htmlElement.insertAdjacentHTML('beforeend', messageTmpl());
    messageDiv.htmlElement.getElementsByClassName('order-link-container')[0];
}
