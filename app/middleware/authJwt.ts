import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { UserRequest } from "../interface/user_and_roles.interface";
import { RoleModel } from "../model/role.model";
import { UserModel } from "../model/user.model";

export const authJwt = {
  verifyToken: (req: UserRequest, res: Response, next: NextFunction) => {
    let token = (req.headers.authorization as string).replace("Bearer ", "");

    if (!token) return res.status(403).send({ message: "No token provided!" });
    try {
      jwt.verify(token, config.app.secret, (err: any, decoded: any) => {
        res.locals.userId = decoded.id;
        next();
      });
    } catch (error) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
  },
  isAdmin: (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      UserModel.findById(req.userId).exec((error: any, user: any) => {
        RoleModel.find(
          {
            _id: { $in: user.roles },
          },
          (error: any, roles: any) => {
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].name === "admin") {
                next();
                return;
              }
            }

            return res.status(403).send({ message: "Require Admin Role!" });
          }
        );
      });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },
};
