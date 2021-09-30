import {config} from "../config/sequilize.js";
import Sequelize from "sequelize";
import {user} from './user.js'
import {ticket} from './ticket.js'
import {comment} from './comment.js'
const sequelize = new Sequelize(...config);

export const db = {
    Sequelize : Sequelize,
    sequelize : sequelize,
    user : user(sequelize, Sequelize),
    ticket : ticket(sequelize, Sequelize),
    comment : comment(sequelize, Sequelize)
};
