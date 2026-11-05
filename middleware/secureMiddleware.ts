import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role, type User } from "../data/interfaces";

export function secureMiddleware(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies?.jwt;

    if (!token) {
        console.log("No token found, redirecting to login");
        return res.redirect("/login"); 
    }
    
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) {
            res.redirect("/login");
        } else {
            res.locals.user = user;
            next();
        }
    });
};


export function restrict_when_logged_in(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies?.jwt;

    if (!token) {
        return next()
    }
    
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) {
            res.locals.user = user;
            next();
        } else {
            res.locals.user = user;
            res.redirect("/");
        }
    });
};

export function only_admin(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user as User | undefined

    
    
    if (user?.role == Role.admin) {
        next()
    }else{
        res.redirect("/")
    }
};
