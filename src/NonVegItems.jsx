import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './nonVegStyle.css';
import { AddToCart } from './store';

function NonVegItems() {
  const dispatch = useDispatch();
  const nonVegProducts = useSelector(state => state.product.NonVeg);

  // Price range (min and max)
  const [priceRange, setPriceRange] = useState(500); // Max filter price
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle price slider change
  const handleSliderChange = (e) => {
    setPriceRange(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Filter products based on selected price
  const filteredNonVegProducts = nonVegProducts.filter(product => product.price <= priceRange);

  // Pagination logic
  const totalPages = Math.ceil(filteredNonVegProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredNonVegProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="nonveg-wrapper">
      {/* === Filter Section === */}
      <div className="nonveg-container">
        <h2>Filter by Price</h2>

        {/* Price Slider Input */}
        <div className="price-slider">
          <label>Showing items under: <strong>Rs {priceRange}</strong></label>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={priceRange}
            onChange={handleSliderChange}
          />
        </div>

        {/* Clear Filter Button */}
        <button onClick={() => setPriceRange(500)}>Clear Filter</button>
      </div>

      {/* === Product Display Section === */}
      <div className="nonveg-products">
        <h1 className="nonveg-title">Non-Veg Items</h1>
        <ol>
          {paginatedProducts.map((product, index) => (
            <div className='nonveg-Cart' key={index}>
              <img src={product.image} alt={product.name} className='nonveg-Image' />
              <h3>{product.name}</h3>
              <p>Rs {product.price}</p>
              <button onClick={() => dispatch(AddToCart(product))}>Add To Cart</button>
            </div>
          ))}
        </ol>

        {/* === Pagination Controls === */}
        <div className="nonVeg-pagination-controls">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅ Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active-page' : ''}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default NonVegItems;
