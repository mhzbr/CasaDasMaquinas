import {Role} from "../models/enums/role";
import {Filter} from "../models/filter";

export function parseToInt(value: string | undefined): number | undefined
{
    return value ? parseInt(value) : undefined;
}

export function getFilters(body: any)
{
    if (!body)
    {
        return null;
    }

    const {
        minWeight,
        maxWeight,
        minPrice,
        maxPrice,
        minAge,
        maxAge,
        minHeight,
        maxHeight,
        genre,
        isOnline
    } = body;

    const filter: Filter = {};

    if (minWeight)
    {
        filter.minWeight = parseToInt(minWeight);
    }

    if (maxWeight)
    {
        filter.maxWeight = parseToInt(maxWeight);
    }

    if (minPrice)
    {
        filter.minPrice = parseToInt(minPrice);
    }

    if (maxPrice)
    {
        filter.maxPrice = parseToInt(maxPrice);
    }

    if (minAge)
    {
        filter.minAge = parseToInt(minAge);
    }

    if (maxAge)
    {
        filter.maxAge = parseToInt(maxAge);
    }

    if (minHeight)
    {
        filter.minHeight = parseToInt(minHeight);
    }

    if (maxHeight)
    {
        filter.maxHeight = parseToInt(maxHeight);
    }

    if (genre)
    {
        filter.genre = genre;
    }

    if (isOnline)
    {
        filter.isOnline = (isOnline == "true") || (isOnline == true);
    }

    return filter;
}

export function getMongooseFilters(filter: Filter)
{
    const query: any = {};

    if (filter.minWeight)
    {
        query["profile.weight"] = query["profile.weight"] || {};
        query["profile.weight"].$gte = filter.minWeight;
    }
    if (filter.maxWeight)
    {
        query["profile.weight"] = query["profile.weight"] || {};
        query["profile.weight"].$lte = filter.maxWeight;
    }

    if (filter.minPrice)
    {
        query["profile.valuePerHour"] = query["profile.valuePerHour"] || {};
        query["profile.valuePerHour"].$gte = filter.minPrice;
    }
    if (filter.maxPrice)
    {
        query["profile.valuePerHour"] = query["profile.valuePerHour"] || {};
        query["profile.valuePerHour"].$lte = filter.maxPrice;
    }

    if (filter.minHeight)
    {
        query["profile.height"] = query["profile.height"] || {};
        query["profile.height"].$gte = filter.minHeight;
    }
    if (filter.maxHeight)
    {
        query["profile.height"] = query["profile.height"] || {};
        query["profile.height"].$lte = filter.maxHeight;
    }

    if (filter.genre)
    {
        query["profile.genre"] = filter.genre;
    }

    query.role = Role.SELLER;

    return query;
}

// Helper function to filter out falsey values
export function filterOutFalseValues(obj: any)
{
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value)
    );
}