import { ISort } from '../api/index.types';
import { sortRequest } from '@/features/sort/api';
import { DropDown } from '@/shared/uikit/dropdown';
import { TextItem } from '@/shared/uikit/textItem';

function renderItem(sort: ISort) {
    return (parent: HTMLElement) => {
        const item = new TextItem(parent, {
            className: `dropdown-category-item-${sort.sortID}`,
            name: sort.sortName,
            id: sort.sortID,
            textSize: 'header',
        });

        item.htmlElement.dataset['sortID'] = sort.sortID.toString();

        return {
            item: item,
            id: sort.sortID.toString(),
        };
    };
}

export async function useGetSortDropdown(
    parent: Element,
    className: string,
    initialSortId?: string,
) {
    const sortDropdown = new DropDown<TextItem>(parent, {
        className: className,
        defaultText: 'Настроить сортировку',
        togglerPlace: 'left',
        width: '340px',
        size: 'xs',
    });

    return sortRequest()
        .then(({ status, data }) => {
            if (status === 200) {
                data.forEach((sortItem) => {
                    sortDropdown.addItem(renderItem(sortItem));
                });
            }

            if (initialSortId) {
                changeSortItem(sortDropdown, initialSortId);
            }

            return sortDropdown;
        })
        .catch(() => {
            return sortDropdown;
        });
}

export function changeSortItem(
    sortDropdown: DropDown<TextItem>,
    sortID: string,
) {
    if (sortDropdown.itemById(sortID)) {
        sortDropdown.mainText = sortDropdown.itemById(sortID).name;
    }
}
