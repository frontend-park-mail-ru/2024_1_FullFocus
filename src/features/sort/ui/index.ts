import { ISort } from '../api/index.types';
import { sortRequest } from '@/features/sort/api';
import { DropDown } from '@/shared/uikit/dropdown';
import { TextItem } from '@/shared/uikit/textItem';

function renderItem(sort: ISort, dropDown: DropDown<TextItem>, index: number) {
    dropDown.addItem((parent: Element) => {
        const item = new TextItem(parent, {
            className: `dropdown-category-item-${sort.sortID}`,
            name: sort.sortName,
            id: sort.sortID,
        });

        item.htmlElement.dataset['sortID'] = sort.sortID.toString();

        return {
            item: item,
            id: index.toString(),
        };
    });
}

export async function useGetSortCards(dropDown: DropDown<TextItem>) {
    return sortRequest()
        .then(({ status, data }) => {
            const sorts: Array<() => void> = [];
            if (status === 200) {
                data.forEach((sortItem, index) => {
                    sorts.push(() => {
                        renderItem(sortItem, dropDown, index);
                    });
                });
            }
            return sorts;
        })
        .catch(() => {
            const sorts: Array<() => void> = [];
            return sorts;
        });
}
