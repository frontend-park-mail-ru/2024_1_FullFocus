export interface IComment {
    advanatages: string;
    comment: string;
    createdAt: string;
    disadvantages: string;
    profileAvatar: string;
    profileName: string;
    rating: number;
    reviewID: number;
}

export interface IaddComment {
    productID: number;
    rating: number;
    comment: string;
    advantages: string;
    disadvantages: string;
}
