export interface IComment {
    "profileName": string,
    "profileAvatar": string,
    "createdAt": string,
    "rating": number,
    "comment": string,
    "advantages": string,
    "disadvantages": string
}


export interface IaddComment {
    "productID": number,
    "rating": number,
    "comment": string,
    "advantages": string,
    "disadvantages": string
}