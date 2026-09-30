import { Request, Response } from "express";
import { PostInputDto } from "../../dto/post.input.dto";
import { Post } from "../../types/post";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";
import {mapToPostViewModel} from "../mappers/map-to-post-view-model.utils";

/*
Контроллер на обновление, не знает, что происходит в БД,
его задача: принять запрос, перенаправить в репозиторий,
получить данные из репозитория, вернуть респонс.
*/
export const createPostHandler = async (
    req: Request<{}, {}, PostInputDto>,
    res: Response
) => {
    try {
        // Поскольку по API необходимо вернуть в т.ч. наименование блога,
        // для его извлечения нужен id блога.
        const blogId = req.body.blogId;

        const blog = await blogsRepository.findById(blogId);

        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessages([{ message: 'Blog not found', field: 'blogId' }]));

            return;
        }

        const newPost: Post = {
            ...req.body,
            blogName: blog.name,
            createdAt: new Date(),
        };

        const createdPost = await postsRepository.createPost(newPost);
        const postViewModel = mapToPostViewModel(createdPost);
        res.status(HttpStatus.Created_201).send(postViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500)
    }
};
