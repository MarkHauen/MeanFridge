const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectToDatabase = require('./Data/databaseConn'); 
const inventoryRoutes = require('./Endpoints/inventoryRoutes');
const recipesRoutes = require('./Endpoints/recipesRoutes');


const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// CONNECT TO DATABASE
connectToDatabase.connectToDatabase();

// ROUTES
app.use('/inventory', inventoryRoutes);
app.use('/recipes', recipesRoutes);


// RUN SERVER with 'node index.js'
app.listen(port, () => {
    console.log(`React Fridge listening at http://localhost:${port}`);
});
