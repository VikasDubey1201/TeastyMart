import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homeStyle.css';
import AboutUs from './aboutUs';

const slideshowImages = [
  "/Images/homebrin.jpeg",
  "/Images/homeburger.jpeg",
  "/Images/homedosa.jpeg",
  "/Images/homefish.jpeg",
  "/Images/Milk Buttermilk.png",
  "/Images/Non veg Rogan Josh.png",
  "/Images/VegColiflower.png"
];

function Home() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div
        className="home-hero"
        style={{ backgroundImage: `url(${slideshowImages[currentImageIndex]})` }}
      >
        <div className="hero-overlay">
          <h1 className="home-title">Welcome to My Big New Basket</h1>
          <p className="home-subtitle">
            Your one-stop shop for fresh groceries, dairy, chocolates, and more!
          </p>
          <div className="home-buttons">
            <button onClick={() => navigate('/veg')}>
              <span>🍅 Veg Items</span>
              <small>Eat Healthy, Live Happy!</small>
            </button>
            <button onClick={() => navigate('/NonVeg')}>
              <span>🍗 Non-Veg Items</span>
              <small>Your Daily Dose of Delicious Protein.</small>
            </button>
            <button onClick={() => navigate('/milk')}>
              <span>🥛 Milk</span>
              <small>The Milky Way to Your Day!</small>
            </button>
            <button onClick={() => navigate('/chocolate')}>
              <span>🍫 Chocolate</span>
              <small>Simply Irresistible Chocolate.</small>
            </button>
          </div>
        </div>
      </div>

      <div className="home-info-section">
        <h2>Why Choose Us?</h2>
        <div className="info-cards">
          <div className="info-card">🌱 Fresh and organic products delivered daily</div>
          <div className="info-card">📦 Hassle-free delivery across your city</div>
          <div className="info-card">💸 Affordable prices and exclusive deals</div>
          <div className="info-card">❤️ Trusted by 10,000+ happy customers</div>
        </div>
      </div>

      <div className="home-footer">
        <AboutUs />
        <p className="footer-text">--- You've reached the end of the menu ---</p>
      </div>
    </div>
  );
}

export default Home;
