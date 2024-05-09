import { Component } from '@/shared/@types/index.component';
import { SortWidgetProps } from '@/widgets/sort/ui/index.types';
import sortWidgetTmpl from '@/widgets/sort/ui/index.template.pug';
import './index.style.scss';
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
        });
    }

    changeSortName(sortID: string) {
        if (this.dropDown.itemById(sortID)) {
            this.dropDown.mainText = this.dropDown.itemById(sortID).name;
        }
    }

    protected render() {
        this.renderTemplate();
        this.renderSection();
    }
}
