import { responseHelper } from "./responseHelper.js";
import { db } from "../models/index.js";

export const ensureAuthenticated = async (req, res, next) => {
  if (req.get("Authorization")) {
    try {
      const user_email = req.get("Authorization").substring(7);
      const userDB = await db.user.findOne({ where: { email: user_email } });
      if (!userDB || !userDB.id) throw "No user found";
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

export const checkJWT = (req, res, next) => {
  try {
  
    if (req.get("Authorization")){
      // Check if it corresponds to JWT, check for it in database, check validity, validate session etc 
      console.log(req.get("Authorization"));
    }
    
    
    return next();
  } catch {
    new responseHelper(res).unauthorizedRequest(
      "Server failed to check your session token :/"
    );
  }
};
