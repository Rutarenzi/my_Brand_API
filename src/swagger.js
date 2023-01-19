import swaggerJSDoc from 'swagger-jsdoc';


const options = {
  definition:
  {
    openapi: '3.0.0',
    info: {
      title: 'My Blog documentation',
      version: '1.0.0',
      description:"this is a Rest API application on blogs"
    },
    servers:[
      {
          url: 'https://my-brand-api-zgjz.onrender.com/api/',
          description: 'Dev server'
      }
    ]
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },

  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);