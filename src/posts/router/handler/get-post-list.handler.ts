import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.utils";

export const getPostListHandler = async (req: Request, res: Response) => {
    try {
        const posts = await postsRepository.findAllPosts();

        // Наружу отдаем view-model
        const postViewModel = posts.map(mapToPostViewModel);
        res.status(HttpStatus.Ok_200).send(postViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
