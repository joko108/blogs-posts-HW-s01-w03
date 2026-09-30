import { Post } from "../types/post";
import { ObjectId, WithId } from "mongodb";
import { postCollection } from "../../db/collections";

export const postsRepository = {
    // Возвращаем все блоги
    async findAllPosts(): Promise<WithId<Post>[]> {
        return postCollection.find().toArray();
    },

    // Возвращаем конкретный блог по id
    async findPostById(id: string): Promise<WithId<Post> | null> {
        return postCollection.findOne({ _id: new ObjectId(id) });
    },

    // Создание блога, без поля id (id генерируется здесь)
    async createPost(newPost: Post): Promise<WithId<Post>> {
        const insertResult = await postCollection.insertOne(newPost);
        return { ...newPost, _id: insertResult.insertedId };
    },

    async updatePost(id: string, post: Omit<Post, 'createdAt' | 'blogName'>): Promise<boolean> {
        const updateResult = await postCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: post },
        );
        return updateResult.matchedCount > 0;
    },

    async deletePost(id: string): Promise<boolean> {
        const deleteResult = await postCollection.deleteOne({ _id: new ObjectId(id) });
        return deleteResult.deletedCount > 0;
    },
};
