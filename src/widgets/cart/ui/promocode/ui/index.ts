import './index.style.scss';
import cartPromocodesTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { AksCodeResponse, CartPromocodesProps } from './index.types';
import { MAX_PROMOCODE_LEN, PromocodeCard } from '@/entities/promocode';
import { Button, getExitBtn } from '@/shared/uikit/button';
import { animateLongRequest } from '@/shared/api/ajax/throttling';
import { useGetPromocodeCardByCode } from '@/features/promocodes/ui';
import { NewCode } from './newCode';
import { Confirmation } from './confirmation';

export class CartPromocodes extends Component<
    HTMLDivElement,
    CartPromocodesProps
> {
    protected selectedPromocodeCard: PromocodeCard;
    protected confirmSection: Confirmation;
    protected cancelSelectedBtn: Button;
    protected newCode: NewCode;
    protected state: 'NEW_CODE' | 'CONFIRMATION' | 'WITH_CODE' | 'INIT';

    constructor(parent: Element, props: CartPromocodesProps) {
        super(parent, cartPromocodesTmpl, props);
    }

    setNewCodeSelection() {
        switch (this.state) {
            case 'CONFIRMATION':
                this.removeSelectedCard();
                this.removeConfirmation();
                break;
            case 'WITH_CODE':
                this.removeSelectedCard();
                this.removeConfirmation();
                this.removeCancelSelected();
                this.addNewCodeSelection();
                break;
            case 'INIT':
                this.addNewCodeSelection();
                break;
        }

        this.state = 'NEW_CODE';
    }

    setConfirmation(
        codeCard: (parent: Element, className: string) => PromocodeCard,
        confirmListener: () => void,
        cancelListener: () => void,
    ) {
        switch (this.state) {
            case 'NEW_CODE':
                this.addSelectedCard(codeCard);
                this.addConfirmation(confirmListener, cancelListener);
                break;
            case 'WITH_CODE':
                this.removeCancelSelected();
                this.removeSelectedCard();
                this.addNewCodeSelection();
                this.addSelectedCard(codeCard);
                break;
            case 'CONFIRMATION':
                // TODO just change card's ui
                this.removeSelectedCard();
                this.removeConfirmation();
                this.addSelectedCard(codeCard);
                this.addConfirmation(confirmListener, cancelListener);
                break;
            case 'INIT':
                this.addSelectedCard(codeCard);
                this.addConfirmation(confirmListener, cancelListener);
                break;
        }

        this.state = 'CONFIRMATION';
    }

    setWithCode(
        codeCard?: (parent: Element, className: string) => PromocodeCard,
    ) {
        switch (this.state) {
            case 'NEW_CODE':
                if (codeCard) {
                    this.removeNewCodeSelection();
                    this.addSelectedCard(codeCard);
                    this.addCancelSelected();
                }
                break;
            case 'CONFIRMATION':
                this.removeNewCodeSelection();
                this.removeConfirmation();
                this.addCancelSelected();
                break;
            case 'INIT':
                if (codeCard) {
                    this.addSelectedCard(codeCard);
                    this.addCancelSelected();
                }
                break;
        }

        this.state = 'WITH_CODE';
    }

    // User clicked on 'confirm' or 'cancel' button
    protected userDecided(response: AksCodeResponse) {
        this.removeConfirmation();

        if (response.confirmed) {
            this.setWithCode();
            this.props.promocodeUsedCallback(
                response.id,
                response.minSum,
                response.benefitType,
                response.value,
            );
        }

        if (!response.confirmed) {
            this.setNewCodeSelection();
        }
    }

    // Try to render new card by its code
    protected putNewCode(code: string) {
        this.newCode.submitBtn.setDisabled();
        animateLongRequest(
            useGetPromocodeCardByCode,
            (data) => {
                if (data !== null) {
                    this.setWithCode(data.card);
                    this.props.promocodeUsedCallback(
                        data.activationInfo.id,
                        data.activationInfo.minSumActivation,
                        data.activationInfo.benefitType,
                        data.activationInfo.value,
                    );
                }
            },
            () => {
                // TODO error message
            },
            () => {
                this.newCode.submitBtn.startLoading();
            },
            () => {
                this.newCode.submitBtn.stopLoading();
                this.newCode.submitBtn.setEnabled();
            },
            1000,
            500,
        )(code);
    }

    protected askForNewCode(code: string) {
        this.newCode.submitBtn.setDisabled();

        return new Promise<AksCodeResponse>((resolve, reject) => {
            animateLongRequest(
                useGetPromocodeCardByCode,
                (data) => {
                    if (data !== null) {
                        this.setConfirmation(
                            data.card,
                            () => {
                                resolve({
                                    confirmed: true,
                                    id: data.activationInfo.id,
                                    minSum: data.activationInfo
                                        .minSumActivation,
                                    benefitType:
                                        data.activationInfo.benefitType,
                                    value: data.activationInfo.value,
                                });
                            },
                            () => {
                                resolve({ confirmed: false });
                            },
                        );
                    }
                },
                () => {
                    reject();
                },
                () => {
                    this.newCode.submitBtn.startLoading();
                },
                () => {
                    this.newCode.submitBtn.stopLoading();
                    this.newCode.submitBtn.setEnabled();
                },
                1000,
                500,
            )(code);
        });
    }

    // Render confirmation component
    protected addConfirmation(
        confirmListener: () => void,
        cancelListener: () => void,
    ) {
        this.confirmSection = new Confirmation(this.htmlElement, {
            className: 'promocodes-section__confirmation',
        });

        // Add new event listeners to confirm/cancel buttons
        this.confirmSection.confirmBtn.htmlElement.addEventListener(
            'click',
            () => {
                confirmListener();
            },
        );

        this.confirmSection.cancelBtn.htmlElement.addEventListener(
            'click',
            () => {
                cancelListener();
            },
        );
    }

    // Remove confirmation component
    protected removeConfirmation() {
        this.confirmSection?.destroy();
        this.confirmSection = null;
    }

    // Render selected promocode card
    protected addSelectedCard(
        codeCard: (parent: Element, className: string) => PromocodeCard,
    ) {
        if (this.selectedPromocodeCard) {
            this.removeSelectedCard();
        }
        this.selectedPromocodeCard = codeCard(
            this.htmlElement,
            'promocodes-section__selected-code',
        );
    }

    // Remove selected promocode card
    protected removeSelectedCard() {
        this.selectedPromocodeCard?.destroy();
        this.selectedPromocodeCard = null;
    }

    // Render input and dropdown to select new promocode
    protected addNewCodeSelection() {
        this.newCode = new NewCode(this.htmlElement, {
            className: 'promocodes-section__new-code',
        });

        this.newCode.dropdown.dropDownItemsElement.addEventListener(
            'click',
            (e: Event) => {
                const target = (e.target as HTMLElement).closest('[data-code]');
                if (target) {
                    /*
                     * this.askForNewCode(
                     *     (target as HTMLDivElement).dataset['code'],
                     * )
                     *     .then((confirmed) => {
                     *         this.userDecided(confirmed);
                     *     })
                     *     .catch(() => {});
                     */
                    this.putNewCode((target as HTMLDivElement).dataset['code']);
                }
            },
        );

        this.newCode.formElement.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            if (this.newCode.input.inputValue.length === MAX_PROMOCODE_LEN) {
                /*
                 * this.askForNewCode(this.newCode.input.inputValue)
                 *     .then((confirmed) => {
                 *         this.userDecided(confirmed);
                 *     })
                 *     .catch(() => {});
                 */
                this.putNewCode(this.newCode.input.inputValue);
            }
        });
    }

    // Remove input and dropdown to select new promocode
    protected removeNewCodeSelection() {
        this.newCode?.destroy();
        this.newCode = null;
    }

    // Render 'cancel' button
    protected addCancelSelected() {
        this.cancelSelectedBtn = getExitBtn(
            this?.selectedPromocodeCard.htmlElement,
            {
                className: 'promocodes-section__cancel-selted-btn',
                btnStyle: 'white',
                type: 'button',
                // btnText: 'Отменить',
                size: 'xs-only',
            },
        );

        this.cancelSelectedBtn.htmlElement.addEventListener('click', () => {
            this.setNewCodeSelection();
            this.props.promocodeCanceledCallback();
        });
    }

    // Remove 'cancel' button
    protected removeCancelSelected() {
        this.cancelSelectedBtn?.destroy();
        this.cancelSelectedBtn = null;
    }

    protected render() {
        this.renderTemplate();
        this.state = 'INIT';
        this.setNewCodeSelection();
    }
}
