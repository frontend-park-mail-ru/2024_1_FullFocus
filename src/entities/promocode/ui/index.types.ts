export interface PromocodeCardProps {
    className: string;
    id: number;
    style: 'small' | 'full';
    code: string;
    description: string;
    timeLeft?: string;
}
