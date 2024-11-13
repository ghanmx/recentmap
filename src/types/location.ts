
export interface Location {
    id: string;
    name: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LocationInput {
    name: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
}

export interface LocationFilter {
    id?: string;
    name?: string;
    city?: string;
    state?: string;
    country?: string;
}
