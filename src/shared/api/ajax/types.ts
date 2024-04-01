export interface QueryParam {
    key: string;
    value: string;
}

export interface DataResponce<T> {
    Status: number;
    Data?: T;
    Msg?: string;
    MsgRus?: string;
}
