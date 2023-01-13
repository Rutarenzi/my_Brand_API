import swaggerJSDoc from 'swagger-jsdoc';
// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'My Blog documentation',
//     version: '1.0.0',
//     description:"this is a Rest API application on blogs"
//   },
//   servers:[
//     {
//         url: 'http://localhost:2005',
//         description: 'Dev server'
//     }
//   ]
// };

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
          url: 'https://lazy-puce-marlin-robe.cyclic.app/api/news',
          description: 'Dev server'
      }
    ]
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);