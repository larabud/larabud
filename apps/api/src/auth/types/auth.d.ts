export interface AuthenticatedUser {
    id: number;
    name: string;
}

export interface AuthenticatedJWTUser {
    id: number;
    name: string;
    accessToken: string
    refreshToken: string
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string
}
