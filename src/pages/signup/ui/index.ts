import './style.scss';
import { SignUpFormCard } from '@/widgets/signupFormCard';
import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { signupUser } from '@/features/auth';
import { parseForm } from '@/entities/form';

export class SignUp extends EmptyContainer {
    name: string;
    formObj: SignUpFormCard;
    private navigateToMain: () => void;
    private listener: (e: SubmitEvent) => void;

    /**
     * Constructor for SignUp page object
     * @param {Element} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: Element, name: string, navigateToMain: () => void) {
        super(parent, { className: 'signup-page' });

        this.name = name;
        this.navigateToMain = navigateToMain;
    }

    private componentDidMount() {
        this.listener = (e: SubmitEvent) => {
            e.preventDefault();
            this.formObj.clearError();

            const formData = parseForm(this.formObj.form);

            if (formData.isValid) {
                this.formObj.form.setReadonly();

                signupUser(this.formObj.form.htmlElement)
                    .then(({ status, msgRus }) => {
                        this.formObj.form.setNotReadonly();
                        if (status === 200) {
                            this.navigateToMain();
                            return;
                        }

                        this.formObj.form.setInvalid();
                        this.formObj.addError(msgRus);
                    })
                    .catch(() => {});
            }
        };

        this.htmlElement.addEventListener('submit', this.listener);
    }

    private componentWillUnmount() {
        this.htmlElement.removeEventListener('submit', this.listener);
    }

    /**
     * Renders signup page
     */
    render() {
        super.render();

        this.formObj = new SignUpFormCard(this.htmlElement, {
            className: 'signup-form-card-main',
        });
        this.formObj.render();

        this.componentDidMount();
    }

    destroy(): void {
        super.destroy();
        this.componentWillUnmount();
    }
}
