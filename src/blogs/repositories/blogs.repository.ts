import { Blog } from "../types/blog";
import { ObjectId, WithId } from "mongodb";
import { blogCollection } from "../../db/collections";

export const blogsRepository = {
    // Возвращаем все блоги
    async findAll(): Promise<WithId<Blog>[]> {
        return blogCollection.find().toArray();
    },

    // Возвращаем конкретный блог по id
    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogCollection.findOne({ _id: new ObjectId(id) });
    },

    async create(newBlog: Blog): Promise<WithId<Blog>> {
        const insertResult = await blogCollection.insertOne(newBlog);
        return { ...newBlog, _id: insertResult.insertedId };
    },

    async update(
        id: string,
        blog: Omit<Blog, 'createdAt' | 'isMembership'>
    ): Promise<boolean> {
        const updateResult = await blogCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: blog }
        );
        return updateResult.matchedCount > 0;
    },

    async delete(id: string): Promise<boolean> {
        const deleteResult = await blogCollection.deleteOne({ _id: new ObjectId(id) });
        return deleteResult.deletedCount > 0;
    },
};
