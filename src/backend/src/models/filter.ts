import {Genre} from "./enums/genre";

export interface Filter
{
    minWeight?: number;
    maxWeight?: number;
    minPrice?: number;
    maxPrice?: number;
    minAge?: number;
    maxAge?: number;
    minHeight?: number;
    maxHeight?: number;
    genre?: Genre;
    isOnline?: boolean;
}