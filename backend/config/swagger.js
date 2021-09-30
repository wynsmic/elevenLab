
 const swaggerOptions ={
  swaggerDefinition: {
      info: {
          title: "ASTRONAUT API",
          description: "API Documentation",
          contact: {
              name: "wynsmic"
          },
          servers: ["http://localhost:4000"]
      }
  },
  // ['.routes/*.js']
  apis: ['./routes/**.js'],
};

  export {swaggerOptions};