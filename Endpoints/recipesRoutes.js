const express = require('express');
const router = express.Router();


// Provide the locally stored recipe.json file to the frontend as a JSON object
router.get('/', (req, res) => {
    res.send(require('../Data/recipes.json'));
});


module.exports = router;