import React from 'react'

function FilterComponent({categories, selectedCategory, onCategoryChange}) {
    
  return (
    <div className='p-5 bg-slate-300 mb-10'>
        <label htmlFor="category">Kategori Seç:</label>
        <select
            id="category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
        >
            <option value="">Tüm Kategoriler</option>
            {categories.map((category,index) => (
                <option key={index} value={category}>
                    {category}
                </option>
            ))}
        </select>
    </div>
  )
}

export default FilterComponent