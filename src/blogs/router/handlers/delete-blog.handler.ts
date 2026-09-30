import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

export const deleteBlogHandler = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const id = req.params.id;

        // Обязательно await, иначе вернется Promise, что всегда будет truthy,
        // тогда проверка никогда не случится.
        const blog = await blogsRepository.findById(id);

        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(
                    createErrorMessages([{ message: 'Blog not found', field: 'id'}])
                );
            return;
        }

        await blogsRepository.delete(id);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
