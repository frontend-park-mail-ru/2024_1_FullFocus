import { Component } from '@/shared/@types/index.component';
import { SortWidgetProps } from '@/widgets/sort/ui/index.types';
import sortWidgetTmpl from '@/widgets/sort/ui/index.template.pug';
import './index.style.scss';
import { useGetSortCards } from '@/features/sort';
import { DropDown } from '@/shared/uikit/dropdown';
import { TextItem } from '@/shared/uikit/textItem';

export class SortWidget extends Component<HTMLDivElement, SortWidgetProps> {
    protected dropDown: DropDown<TextItem>;

    constructor(parent: Element, props: SortWidgetProps) {
        super(parent, sortWidgetTmpl, props);
    }

    renderSection() {
        this.dropDown = new DropDown<TextItem>(this.htmlElement, {
            className: 'dropdown',
            defaultText: 'Настроить сортировку',
            togglerPlace: 'left',
            size: 'xs',
        });
        useGetSortCards(this.dropDown)
            .then((sorts: (() => void)[]) => {
                sorts.forEach((s) => {
                    s();
                });
            })
            .catch((error) => {
                console.error('Ошибка при загрузке сортировок:', error);
            });
    }

    protected render() {
        this.renderTemplate();
        this.renderSection();
    }
}
