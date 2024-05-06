import {OrderBy} from "../models/enums/orderby";

export function getOrderBy(body: any)
{
    if (!body)
    {
        return {};
    }

    const {orderBy} = body;

    if (orderBy === OrderBy.RATING)
    {
        return {"profile.stars": -1};
    }

    return {};
}