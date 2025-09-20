export interface User {
    user_id: string;
    base_currency: string;
    favorites: string[];
    created_at: string;
    updated_at: string;
}

export interface UpdateUserRequest {
    base_currency?: string;
    favorites?: string[];
}

export type UserResponse = User;