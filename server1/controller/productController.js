const Product = require('../model/productsModel')
const axios = require('axios');

// list filtered products
exports.getProducts = async (req, res) => {
    const selectedCategory = req.query.selectedCategory;

    try {
        let products;
        if (!selectedCategory) {
            // Kategori seçilmediyse tüm ürünleri getir
            products = await Product.find();
        } else {
            // Belirli bir kategoriye göre ürünleri bul
            products = await Product.find({ categoryName: selectedCategory });
        }

        if (!products.length) {
            const createResult = await createProduct();
            if (createResult.error) {
                return res.status(500).json(createResult);
            }
        }

        return res.json(products);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Sunucu hatası' });
    }
};




// get products from api
    createProduct = async () => {
    
    try {
        const response = await axios.get('https://dummyjson.com/products');
        const productsFromAPI = response.data.products;
        
        for (const productData of productsFromAPI) {
            
            const newProduct = new Product({
                title: productData.title,
                name: productData.name,
                category: productData.category,
                price: productData.price,
                image: productData.images[0]
            });
            await newProduct.save();
        }
        
        
    } catch (error) {
        res.status(500).json({ error: 'Ürünler alınırken bir hata oluştu.'});
    }
}

