import {Router,Request, Response} from "express";
import {userService} from "../domain/user-service";
import {loginValidator, passwordValidator} from "../middlewares/userMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {body} from "express-validator";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/authMiddleware";

export const authRouter = Router({})

authRouter.post('/login', body('login').trim().isLength({min:1}),body('password').trim().isLength({min:1}) , inputValidationMiddleware, async (req:Request, res:Response)=>{
    const user = await userService.checkCredentials(req.body.login, req.body.password)
    if(!user){
        res.send(401)
        return
    }
    const token = await jwtService.createJwt(user)
    console.log(token)
    res.status(200).send(token)
})

authRouter.get('/me', authMiddleware, async (req:Request, res:Response)=>{
    console.log(req)
    //@ts-ignore
    const user = await userService.getUserById(req.user!.userId)
    res.status(200).send(user)
})