import './index.style.scss';
import changePictureTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ChangePictureProps } from './index.types';
import { Button } from '@/shared/uikit/button';
import { uploadProfilePicture } from '@/entities/user/api';

export class ChangePicture extends Component<
    HTMLDivElement,
    ChangePictureProps
> {
    protected picture: HTMLImageElement;
    protected input: HTMLInputElement;
    protected form: HTMLFormElement;
    protected uploadBtn: Button;
    protected imageLoadListener: (e: Event) => void;
    protected submitListener: (e: Event) => void;
    protected uploadedPicture: File;

    constructor(parent: Element, props: ChangePictureProps) {
        super(parent, changePictureTmpl, props);
    }

    set pictureSrc(src: string) {
        this.picture.src = src;
    }

    protected componentDidMount() {
        this.imageLoadListener = (e: Event) => {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            this.uploadedPicture = target.files[0];
            this.picture.src = URL.createObjectURL(this.uploadedPicture);
            this.uploadBtn.show();
        };
        this.input.addEventListener('change', this.imageLoadListener);

        this.submitListener = (e: Event) => {
            e.preventDefault();
            uploadProfilePicture(new FormData(this.form))
                .then(({ status }) => {
                    if (status === 200) {
                        if (this.props.changePictureCallback) {
                            this.props.changePictureCallback();
                        }
                    }
                })
                .catch(() => {});
        };
        this.form.addEventListener('submit', this.submitListener);
    }

    protected render() {
        this.renderTemplate();
        this.picture = this.htmlElement.getElementsByClassName(
            'change-picture__user-picture',
        )[0] as HTMLImageElement;

        this.input = this.htmlElement.getElementsByClassName(
            'change-picture__user-picture-input',
        )[0] as HTMLInputElement;

        this.form = this.htmlElement.getElementsByClassName(
            'change-picture__form',
        )[0] as HTMLFormElement;

        this.uploadBtn = new Button(this.form, {
            className: 'change-picture__upload-btn',
            btnStyle: 'bright',
            btnText: 'Загрузить',
            type: 'submit',
        });
        this.uploadBtn.hide();

        this.componentDidMount();
    }
}
