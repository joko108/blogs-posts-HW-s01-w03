import { Db, MongoClient } from "mongodb";
import { SETTINGS } from "../settings/config";
import { initCollections } from "./collections";

export let client: MongoClient;

// Подключение к БД.
export const runDB = async (url: string): Promise<void> => {
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB_NAME);

    // Инициализируем коллекции.
    initCollections(db);

    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('✅ Connected to the database');
    } catch (error) {
        await client.close();
        throw new Error(`❌ Database not connected: ${error}`);
    }
}
