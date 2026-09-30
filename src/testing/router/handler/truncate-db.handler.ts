import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { getAllCollections } from "../../../db/collections";

// Зачищаем БД (для тестов)
export const truncateDbHandler = async (req: Request, res: Response) => {
    try {
        // Полностью зачищаем все коллекции (для тестов).
        await Promise.all(
            getAllCollections().map((collection) => collection.deleteMany({})));

        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
