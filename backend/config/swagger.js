
 const swaggerOptions ={
  swaggerDefinition: {
      info: {
          title: "MY API TITLE",
          description: "API Documentation",
          contact: {
              name: "Cali"
          },
          servers: ["http://localhost:4000"]
      }
  },
  // ['.routes/*.js']
  apis: ['./routes/**.js'],
};

  export {swaggerOptions};