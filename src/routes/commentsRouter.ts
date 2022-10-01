import {Router} from "express";

export const commentsRouter = Router({})

commentsRouter.get('/:id')
commentsRouter.delete('/:commentId')
commentsRouter.put('/:commentId')