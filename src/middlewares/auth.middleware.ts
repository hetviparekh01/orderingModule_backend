import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import jwt, { JwtPayload } from 'jsonwebtoken'
export class AuthMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction): void {
        try {
            const token=req.headers.authorization?.split(" ")[1];
            if(!token){
                res.status(401).json("Unauthorized  Request")
            }else{
                const decodedToken=jwt.verify(token,"HETVIPAREKH") as JwtPayload
                req.headers._id=decodedToken._id;
                req.headers.role=decodedToken.role;
                next();
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}