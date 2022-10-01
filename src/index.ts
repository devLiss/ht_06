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
dotenv.config()
export const app = express()
const port = process.env.PORT || 3003

app.use(bodyParser.json());
app.delete('/testing/all-data',async (req: Request, res: Response) => {
    const isBlogsDeleted = await blogsRepo.deleteAll();
    const isPostsDeleted = await postRepo.deleteAll();
    const isUsersDeleted = await userRepo.deleteAll();

    res.status(204).send([])
})
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)
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
