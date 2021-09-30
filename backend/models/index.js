import {config} from "../config/sequilize.js";
import Sequelize from "sequelize";
import {astronaut} from './astronaut.model.js'
const sequelize = new Sequelize(...config);

export const db = {
    Sequelize : Sequelize,
    sequelize : sequelize,
    astronaut : astronaut(sequelize, Sequelize)
};
