import { responseHelper } from "./responseHelper.js";
import { db } from "../models/index.js";

export const ensureAuthenticated = async (req, res, next) => {
  if (req.get("Authorization")) {
    try {
      const user_JWT = req.get("Authorization").substring(7);
      const userDB = await db.user.findOne({ where: { jwt: user_JWT } });
      if (!userDB || !userDB.id) throw "No authorized user found";
      else {
        req.user_id = userDB.id;
        return next();
      }
    } catch {
      new responseHelper(res).unauthorizedRequest(
        "Server failed to check your credentials :/"
      );
    }
  } else new responseHelper(res).unauthorizedRequest("Please authenticate !");
};

