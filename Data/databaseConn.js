const mongoose = require('mongoose');


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


const connectToDatabase = () => {
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
};

// seed the database with the ingredients from databaseSeed.json if empty
const seed = () => {
    Inventory.find()
        .then((inventory) => {
            if (inventory.length === 0) {
                const ingredients = require('./databaseSeed.json');
                ingredients.forEach((ingredient) => {
                    const newIngredient = new Inventory({
                        id: ingredient.id,
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                        standardQuantity: ingredient.standardQuantity
                    });
                    newIngredient.save()
                        .then(() => {
                            console.log(`Added ${ingredient.name} to database`);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
            } else {
                console.log('Database already seeded');
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

seed();

module.exports = { connectToDatabase, Inventory };
