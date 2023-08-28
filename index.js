const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inventory model
const inventorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  standardQuantity: {
    type: Number,
    required: false,
  }
});
const Inventory = mongoose.model('Inventory', inventorySchema, 'InventoryCollection');


// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/Inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// CRUD Operations
// Get all ingredients
app.get('/inventory', (req, res) => {
    Inventory.find()
        .then((inventory) => {
        res.send(inventory);
        })
        .catch((error) => {
            console.error(error);
        });
});

// Get ingredient by id
app.get('/inventory/:id', (req, res) => {
    console.log(`Looking for id: ${req.params.id}`)
    Inventory.find({ id: req.params.id })
        .then((inventory) => {
            console.log(inventory);
            res.send(inventory);
        })
        .catch((error) => {
            console.error(error);
        });
});

// Add ingredient
app.post('/inventory', (req, res) => {
    const ingredient = new Inventory({
        id: req.body.id,
        name: req.body.name,
        quantity: req.body.quantity,
        standardQuantity: req.body.quantity
    });

    ingredient.save()
        .then(() => {
            res.send(ingredient);
        })
        .catch((error) => {
            console.error(error);
        });
});

// Update ingredient
app.put('/inventory/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedQuantity = req.body.quantity;
    console.log(`Updating item ${itemId} to quantity ${updatedQuantity}`);
    Inventory.findOneAndUpdate(
        { id: itemId },
        { quantity: updatedQuantity },
        { new: true } 
    )
        .then((updatedItem) => {
            res.send(updatedItem);
        })
        .catch((error) => {
            console.error('Error updating item:', error);
            res.status(500).send('Error updating item');
        });
});

// Delete ingredient
app.delete('/inventory/:id', (req, res) => {
    Inventory.deleteOne({ id: req.params.id })
        .then(() => {
            res.send('Ingredient deleted');
        })
        .catch((error) => {
            console.error(error);
        });
});


// Provide the locally stored recipe.json file to the frontend as a JSON object
app.get('/recipes', (req, res) => {
    res.send(require('./recipes.json'));
});

// RUN SERVER with 'node index.js'
app.listen(port, () => {
   console.log(`Mean Fridge listening at http://localhost:${port}`);
});
