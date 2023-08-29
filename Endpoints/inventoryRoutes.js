const express = require('express');
const Inventory = require('../Data/databaseConn').Inventory;
const router = express.Router();


// Get all ingredients
router.get('/', (req, res) => {
    Inventory.find()
        .then((inventory) => {
            res.send(inventory);
        })
        .catch((error) => {
            console.error(error);
        });
});

// Get ingredient by id
router.get('/:id', (req, res) => {
    Inventory.find({ id: req.params.id })
        .then((inventory) => {
            res.send(inventory);
        })
        .catch((error) => {
            console.error(error);
        });
});

// Add ingredient
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    Inventory.deleteOne({ id: req.params.id })
        .then(() => {
            res.send('Ingredient deleted');
        })
        .catch((error) => {
            console.error(error);
        });
});

module.exports = router;