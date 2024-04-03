export interface QueryParam {
    key: string;
    value: string;
}

export interface DataResponce<T> {
    status: number;
    data?: T;
    msg?: string;
    msgRus?: string;
}
