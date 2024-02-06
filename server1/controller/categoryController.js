const Product = require('../model/productsModel')

exports.getProductsByCategory = async (req, res) => {
    
    
    try {
        const categories = await Product.distinct("category");
        res.json(categories);
        console.log(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};