
## Software Requirements To Run Locally

* Node.js 6.10 or higher
* MongoDB 3.2 or higher

### Running the Application Locally

1. Install Node.js (6.10 or higher) and MongoDB (3.2 or higher) on your dev box

    * Node.js: https://nodejs.org
    * MongoDB: https://docs.mongodb.com/manual/installation

1. Execute `mongod` to start the MongoDB daemon if it's not already running

1. Install Nodemon and Gulp: `npm install nodemon gulp -g`

1. Run `npm install` to install app dependencies

1. Run the following Gulp task to copy required Angular modules into the `public` folder:

    `gulp copy:libs`

1. Run `npm start` to compile the TypeScript and start the server

1. Browse to http://localhost:3000
