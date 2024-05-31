import './index.style.scss';
import discountTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { DiscountProps } from './index.types';
import { BenefitType } from '@/entities/product';

export class Discount extends Component<HTMLDivElement, DiscountProps> {
    protected discountSumElement: HTMLDivElement;
    protected currentDiscountSum: number;

    constructor(parent: Element, props: DiscountProps) {
        super(parent, discountTmpl, props);
    }

    setNewDiscount(
        minSum: number,
        benefitType: BenefitType,
        value: number,
        currentSum: number,
    ) {
        this.props.minSum = minSum;
        this.props.benefitType = benefitType;
        this.props.value = value;
        this.props.currentSum = currentSum;
        this.updateDiscountSum();
    }

    get discountSum() {
        return this.currentDiscountSum;
    }

    protected updateDiscountSum() {
        if (this.props.minSum > this.props.currentSum) {
            this.discountSumElement.classList.add(
                'discount__discount-sum_no-discount',
            );
            this.props.discountSum = `ещё ${this.props.minSum - this.props.currentSum} ₽ до скидки`;
            this.currentDiscountSum = 0;
        }

        if (this.props.minSum <= this.props.currentSum) {
            this.discountSumElement.classList.remove(
                'discount__discount-sum_no-discount',
            );
            this.currentDiscountSum = Math.round(
                this.props.currentSum * (this.props.value / 100),
            );
            this.props.discountSum = `-${this.currentDiscountSum} ₽`;
        }

        this.discountSumElement.innerText = this.props.discountSum;
    }

    protected render() {
        this.renderTemplate();

        this.currentDiscountSum = 0;

        this.discountSumElement = this.htmlElement.getElementsByClassName(
            'discount__discount-sum',
        )[0] as HTMLDivElement;

        this.updateDiscountSum();
    }
}
