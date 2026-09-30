// view-model для отправки по API.
export type BlogViewModel = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: Date;
    isMembership: boolean;
};
