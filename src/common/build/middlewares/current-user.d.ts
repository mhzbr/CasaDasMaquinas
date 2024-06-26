import { NextFunction, Request, Response } from "express";
interface UserPayload {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    cpf?: string;
    role: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}
export declare const currentUser: (req: Request, res: Response, next: NextFunction) => void;
export {};
