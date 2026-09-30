import express, { Express, Request, Response } from "express";
import { HttpStatus } from "./core/types/http-statuses";
import { BLOGS_PATHS } from "./blogs/constants/blogs.paths";
import { blogsRouter } from "./blogs/router/blogs.router";
import { TESTING_PATHS } from "./testing/constants/testing.paths";
import { testingRouter } from "./testing/router/testing.router";
import { POSTS_PATHS } from "./posts/constants/posts.paths";
import { postsRouter } from "./posts/router/posts.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    // Health-check
    app.get('/', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok_200).send('Hello World!');
    });

    app.use(BLOGS_PATHS, blogsRouter);      // Убираем из URL '/blogs'
    app.use(POSTS_PATHS, postsRouter);      // Убираем из URL '/posts'
    app.use(TESTING_PATHS, testingRouter);  // Убираем из URL '/testing'
};
