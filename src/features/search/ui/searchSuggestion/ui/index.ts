import './index.style.scss';
import searchResultTmpl from './index.template.pug';
import magIconTmpl from './magnifier.pug';
import { Component } from '@/shared/@types/index.component';
import { SearchResultProps } from './index.types';
import { Button, getArrowRightBtn } from '@/shared/uikit/button';

export type { SearchResultType } from './index.types';
export const magnifierIconTmpl = magIconTmpl;

export class SearchSuggestion extends Component<
    HTMLDivElement,
    SearchResultProps
> {
    protected toInputBtn: Button;

    constructor(parent: Element, props: SearchResultProps) {
        super(parent, searchResultTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        if (this.props.type === 'item') {
            this.toInputBtn = getArrowRightBtn(this.htmlElement, {
                className: 'search-result__to-input-btn',
                type: 'button',
                btnStyle: 'whiteWithBg',
            });
            this.toInputBtn.htmlElement.dataset.text = this.props.text;
        }

        if (this.props.categoryId !== undefined) {
            this.htmlElement.dataset['categoryId'] = this.props.categoryId;
        }
    }
}
