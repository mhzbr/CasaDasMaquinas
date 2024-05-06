import express from "express";
import {normalizeString} from "../../services/autocomplete-helper";

const json = require("../../places-list/output.json");

const router = express.Router();

router.get("/autocomplete", (req, res) =>
{
    const {query} = req.query as { query: string };
    let filteredCities = [];

    if (query)
    {
        filteredCities = (json.filter((c: {
            city: string;
        }) => normalizeString(c.city.toLowerCase()).startsWith(normalizeString(query.toLowerCase())))).concat(
            json.filter((c: {
                state: string;
            }) => normalizeString(c.state.toLowerCase()).startsWith(normalizeString(query.toLowerCase())))
        );
    }

    res.send(filteredCities.slice(0, 10));
});

export {router as autoCompleteRouter};

