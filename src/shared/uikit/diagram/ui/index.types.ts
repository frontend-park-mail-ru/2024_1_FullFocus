export interface DiagramProps {
    className: string;
    ratings: number[];
    amount: number;
    title: string;
}

export interface DiagramPropsParsed {
    className: string;
    ratings: number[];
    amount: number;
    title: string;
    data: {
        percentage: string;
        widthPercentage: number;
    }[];
}
