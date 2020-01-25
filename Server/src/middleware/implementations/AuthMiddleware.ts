import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';
import { Config } from '../../config/Config';


export function verifyToken(req: any, res: Response, next: NextFunction){

  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "REST: Authentication error" });

  try {
    const decoded: any = verify(token, Config.secret);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
}

export function allowCrossOrigin(req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
}

