import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.utils";

export const getBlogListHandler = async (req: Request, res: Response) => {
    try {
        const blogs = await blogsRepository.findAll();

        // Наружу отдаем view-model.
        const blogViewModel = blogs.map(mapToBlogViewModel);
        res.status(HttpStatus.Ok_200).send(blogViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
