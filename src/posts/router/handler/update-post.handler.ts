import { PostInputDto } from "../../dto/post.input.dto";
import { postsRepository } from "../../repositories/posts.repository";
import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

// Хендлер на обновление, за БД не отвечает, только отправляет респонс клиенту
export const updatePostHandler = async (
    req: Request<{ id: string }, {}, PostInputDto>,
    res: Response
) => {
    try {
        const id = req.params.id;
        const post = await postsRepository.findPostById(id);

        // Если из репозитория вернулось false, отправляем сообщение об ошибке
        if (!post) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessages([{ message: 'Post not found', field: 'id' }]));
            return;
        }

        await postsRepository.updatePost(id, req.body);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
