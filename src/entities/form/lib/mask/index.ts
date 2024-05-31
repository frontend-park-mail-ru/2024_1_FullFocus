import { Input } from '@/shared/uikit/input';

export function usePhoneNumberMask(input: Input) {
    input.inputValue = formatPhoneNumberMask(input.inputValue);
}

export function formatPhoneNumberMask(phoneNumber: string) {
    let formatted = '';

    const x = unformatPhoneNumber(phoneNumber).match(
        /(7)+(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/,
    );

    if (x === null) {
        formatted = '+7';
    } else {
        formatted = !x[3]
            ? '+7' + (x[2] ? x[2] : '')
            : '+7 ' +
              '(' +
              x[2] +
              ')' +
              (!x[4]
                  ? x[3]
                  : ' ' +
                    x[3] +
                    (!x[5] ? '-' + x[4] : '-' + x[4] + '-' + x[5]));
    }

    return formatted;
}

export function unformatPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(/\D/g, '');
}
