import { Request, Response } from "express";
import { BlogInputDto } from "../../dto/blog.input.dto";
import { Blog } from "../../types/blog";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.utils";

/*
Контроллер на обновление, не знает, что происходит в БД,
его задача: принять запрос, перенаправить в репозиторий,
получить данные из репозитория, вернуть респонс.
*/
export const createBlogHandler = async (
    req: Request<{}, {}, BlogInputDto>,
    res: Response
) => {
    try {
        // Формируем тело нового блога, добавляя createdAt и isMembership,
        // _id добавится в репозитории.
        const newBlog: Blog = {
            ...req.body,
            createdAt: new Date(),
            isMembership: false,
        };

        const createdBlog = await blogsRepository.create(newBlog);
        // Модель блога для клиента.
        const blogViewModel = mapToBlogViewModel(createdBlog);
        res.status(HttpStatus.Created_201).send(blogViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
