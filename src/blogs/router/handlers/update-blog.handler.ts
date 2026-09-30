import { BlogInputDto } from "../../dto/blog.input.dto";
import { blogsRepository } from "../../repositories/blogs.repository";
import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

export const updateBlogHandler = async (
    req: Request<{ id: string }, {}, BlogInputDto>,
    res: Response
) => {
    try {
        const id = req.params.id;
        const blog = await blogsRepository.findById(id);

        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessages([{ message: 'Blog not found', field: 'id'}]));
            return;
        }

        await blogsRepository.update(id, req.body);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
