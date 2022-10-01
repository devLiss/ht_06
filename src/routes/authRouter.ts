import {Router,Request, Response} from "express";
import {userService} from "../domain/user-service";
import {loginValidator, passwordValidator} from "../middlewares/userMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {body} from "express-validator";

export const authRouter = Router({})

authRouter.post('/login', body('login').trim().isLength({min:1}),body('password').trim().isLength({min:1}) , inputValidationMiddleware, async (req:Request, res:Response)=>{
    const check = await userService.checkCredentials(req.body.login, req.body.password)
    if(!check){
        res.send(401)
        return
    }
    res.send(204)
})