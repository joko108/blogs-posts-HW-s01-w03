import { Router } from "express";
import { TESTING_ROUTS } from "../constants/testing.paths";
import { truncateDbHandler } from "./handler/truncate-db.handler";

export const testingRouter = Router({});

// Запуск хендлера на зачистку коллекций.
testingRouter.delete(TESTING_ROUTS.ALL_DATA, truncateDbHandler);
