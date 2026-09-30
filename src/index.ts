import express from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./settings/config";
import {runDB} from "./db/mongo.db";

const bootstrap = async () => {
    // Создаем экземпляр Express приложения.
    const app = express();

    // Настраиваем маршруты.
    setupApp(app);

    const PORT = SETTINGS.PORT;

    // Подключаемся к БД (до запуска сервера).
    await runDB(SETTINGS.MONGO_URL);

    // Запуск сервера
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
};

bootstrap();
