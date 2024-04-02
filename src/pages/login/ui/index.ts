import './style.scss';
import { LoginFormCard } from '@/widgets/loginFormCard';
import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { loginUser } from '@/features/auth';
import { parseForm } from '@/entities/form';

export class Login extends EmptyContainer {
    name: string;
    errorsElement: HTMLDivElement;
    formObj: LoginFormCard;
    private navigateToMain: () => void;
    private listener: (e: SubmitEvent) => void;

    /**
     * Constructor for Login page object
     * @param {Element} parent - parent object
     * @param {string} name - name of the page
     */
    // TODO parent: Element
    constructor(parent: Element, name: string, navigateToMain: () => void) {
        super(parent, { className: 'login-page' });

        this.name = name;
        this.errorsElement = null;
        this.navigateToMain = navigateToMain;
    }

    private componentDidMount() {
        this.listener = (e) => {
            e.preventDefault();
            this.formObj.clearError();

            const formData = parseForm(this.formObj.form);

            if (formData.isValid) {
                this.formObj.form.setReadonly();

                loginUser(this.formObj.form.htmlElement)
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
     * Renders login page
     */
    // eslint-disable-next-line max-lines-per-function
    render() {
        // TODO parentItem.htmlElement -> parent
        super.render();

        this.formObj = new LoginFormCard(this.htmlElement, {
            className: 'login-form-card-main',
        });
        this.formObj.render();

        this.componentDidMount();
    }

    destroy(): void {
        super.destroy();
        this.componentWillUnmount();
    }
}
