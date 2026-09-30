import { Request, Response } from "express";
import { postsRepository } from "../../repositories/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.utils";

// Хендлер на вывод поста по ID, за БД не отвечает, только отправляет респонс клиенту
export const getPostHandler = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = req.params.id;
        const post = await postsRepository.findPostById(id);

        // Если из репозитория вернулось null, отправляем сообщение об ошибке
        if (!post) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessages([{ message: 'Post not found', field: 'id' }]));
            return;
        }
        const postViewModel = mapToPostViewModel(post);
        res.status(HttpStatus.Ok_200).send(postViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
