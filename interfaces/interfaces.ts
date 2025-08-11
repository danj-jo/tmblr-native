type postContent = {
    text?: string;
    images?: string[];
}

export type post = {
    id: string;
    userId: string;
    profilePicture: string;
    content: postContent;
    createdAt: string;
    notes: number,
}

export interface user {
    userId: string,
    username: string,
    password: string,
    profilePicture: string
}



