// 1. Librairies
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import express from "express"



// 2. Prepare db : Create tables if not exist
import {db} from './models/index.js'
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});


// 3. create app and online doc
export const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// 4. Cors policy, security, cookies
import cors from "cors";
import helmet from 'helmet';
import cookieParser from "cookie-parser";

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());

// 5. Documenting routes with swagger
const swaggerOptions ={
  swaggerDefinition: {
      info: {
          title: "Ticket To Ride",
          description: "Documentation for the REST API ",
          servers: ["http://localhost:4000"]
      }
  },
  // ['.routes/*.js']
  apis: ['./routes/**.js'],
};
const specs = swaggerJsdoc(swaggerOptions);

// 6.0 test JWT
import {checkJWT} from './utils/authMiddleware.js'
app.use(checkJWT)

// 6. Routes to include
import {usersRoutes} from "./routes/users.routes.js";
import {ticketsRoutes} from "./routes/tickets.routes.js";
import {astronautRoutes} from "./routes/astronaut.routes.js";
import {sessionRoutes} from "./routes/session.routes.js"

usersRoutes(app)
ticketsRoutes(app)
astronautRoutes(app)
sessionRoutes(app)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
