import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { categoryList, productList } from '../utils/APIRoutes';
import FilterComponent from './FilterComponent';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(productList);
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.error('Ürünler getirilirken bir hata oluştu:', error);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get(categoryList);
            setCategories(response.data);
        } catch (error) {
            console.error('Kategoriler getirilirken bir hata oluştu:', error);
        }
    };

    const handleCategoryChange = (selectedCategory) => {
        setSelectedCategory(selectedCategory);
    };

    // Seçilen kategoriye göre ürünleri filtreleme
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <div className='container mx-auto p-10'>
            <h2 className='text-center text-4xl font-bold mb-10'>Product List</h2>

            <FilterComponent
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            <ul className='flex flex-wrap gap-10 justify-center'>
                {filteredProducts.map((product, index) => (
                    <li key={index} className='p-5 bg-slate-400 rounded-md flex flex-col justify-center gap-3 w-60 h-100'>
                        <img className='w-full' src={product.image} alt="" />
                        <p className='font-bold'>{product.title}</p>
                        <p className='font-bold'>{product.price}$</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
