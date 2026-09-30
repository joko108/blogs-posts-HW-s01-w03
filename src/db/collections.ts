import { Collection, Db } from "mongodb";
import { Blog} from "../blogs/types/blog";
import { Post } from "../posts/types/post";

export const BLOG_COLLECTION_NAME = 'blogs';
export const POST_COLLECTION_NAME = 'posts';

// Определяем будущие коллекции, проинициализируются после подключения к БД,
// до подключения они - undefined.
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;

// Создаем объекты коллекций из подключенной БД.
export const initCollections = (db: Db): void => {
    blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<Post>(POST_COLLECTION_NAME);
};

// Для обнуления коллекций
export const getAllCollections = (): Collection<any>[] => {
    return [blogCollection, postCollection];
};
