const MONTHS = {
    '01': 'Января',
    '02': 'Февраля',
    '03': 'Марта',
    '04': 'Апреля',
    '05': 'Мая',
    '06': 'Июня',
    '07': 'Июля',
    '08': 'Августа',
    '09': 'Сентября',
    '10': 'Октября',
    '11': 'Ноября',
    '12': 'Декабря',
};

type Month =
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12';

export function formatDate(rawDate: string) {
    const match = rawDate.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (match !== null && match.length === 4) {
        const [, year, month, day] = match;
        const currentYear = new Date().getFullYear().toString();
        if (month in MONTHS) {
            return `${day.startsWith('0') ? day.substring(1) : day} ${MONTHS[month as Month]}${currentYear === year ? '' : ' ' + year}`;
        }
    }

    return rawDate;
}

export function formatTime(rawTime: string) {
    const match = rawTime.match(/(\d{2}):(\d{2})/);
    if (match !== null && match.length === 3) {
        const [, hours, minutes] = match;
        return `${hours}:${minutes}`;
    }

    return rawTime;
}

export function formatFullDate(rawDate: string) {
    let [date, time] = rawDate.split('T', 2);
    if (date !== undefined || time !== undefined) {
        date = formatDate(date);
        time = formatTime(time);
    }

    return { date: date, time: time };
}
