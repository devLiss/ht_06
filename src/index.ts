// @ts-ignore
import express, {NextFunction, Request, Response} from 'express'
import bodyParser from "body-parser";
import {blogsRouter} from "./routes/blogsRouter";
import {postsRouter} from "./routes/postsRouter";
import {runDB} from "./repositories/db";
import {blogsRepo} from "./repositories/blog-db-repo";
import {postRepo} from "./repositories/post-db-repo";
import {userRouter} from "./routes/usersRouter";
import {authRouter} from "./routes/authRouter";
import {userRepo} from "./repositories/user-db-repo";
import * as dotenv from 'dotenv'
import {commentsRouter} from "./routes/commentsRouter";
import {commentService} from "./domain/comments-service";
import {commentRepo} from "./repositories/comment-db-repo";
dotenv.config()
export const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json());
app.delete('/testing/all-data',async (req: Request, res: Response) => {
    await blogsRepo.deleteAll();
    await postRepo.deleteAll();
    await userRepo.deleteAll();
    await commentRepo.deleteAll();

    res.status(204).send([])
})
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/comments', commentsRouter)
app.get('/',(req:Request, res:Response)=>{
    res.send('Hello!')
})

const startApp = async () => {
    await runDB();
    app.listen(port,()=>{
        console.log(`Listening port ${port}`);
    })
}

startApp();
