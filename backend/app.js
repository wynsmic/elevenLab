// 1. imports
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import express from "express"
import {db} from './models/index.js'
import cors from "cors";
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import {astronautRoutes} from "./routes/astronaut.routes.js";


// 2. Prepare db : Create tables if not exist
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
          title: "ElevenLab Test",
          description: "Documentation for the REST API ",
          servers: ["http://localhost:4000"]
      }
  },
  // ['.routes/*.js']
  apis: ['./routes/**.js'],
};
const specs = swaggerJsdoc(swaggerOptions);

// 6. Routes to include
astronautRoutes(app)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
