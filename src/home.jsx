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
              🍅 Veg Items
              <p>Eat Healthy, Live Happy!</p>
            </button>
            <button onClick={() => navigate('/NonVeg')}>
              🍗 Non-Veg Items
              <p>Your Daily Dose of Delicious Protein.</p>
            </button>
            <button onClick={() => navigate('/milk')}>
              🥛 Milk
              <p>The Milky Way to Your Day!</p>
            </button>
            <button onClick={() => navigate('/chocolate')}>
              🍫 Chocolate
              <p>Simply Irresistible Chocolate.</p>
            </button>
          </div>
        </div>
      </div>

      <div className="home-info-section">
        <h2>Why Choose Us?</h2>
        <p>🌱 Fresh and organic products delivered daily</p>
        <p>📦 Hassle-free delivery across your city</p>
        <p>💸 Affordable prices and exclusive deals</p>
        <p>❤️ Trusted by 10,000+ happy customers</p>
      </div>

      <div className="home-footer">
        <AboutUs />
        <p>--- You've reached the end of the menu ---</p>
      </div>
    </div>
  );
}

export default Home;
