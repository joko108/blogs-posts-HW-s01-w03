import { Request, Response } from "express";
import { postsRepository } from "../../repositories/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

// Хендлер на удаление поста по id, за БД не отвечает, только отправляет респонс клиенту
export const deletePostHandler = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = req.params.id;
        const post = await postsRepository.findPostById(id);

        if (!post) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessages([{ message: 'Post not found', field: 'id' }]));
            return;
        }

        await postsRepository.deletePost(id);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
