import React from 'react';
import './aboutUsStyle.css';

function AboutUs() {
  return (
    <div className="aboutus-container">
      <h1>About Us Page</h1>
      <div className="aboutus-grid">
        <div className="aboutus-card mission">
          <h2>Mission Statement</h2>
          <p>
            Our mission is to deliver fresh, affordable groceries to every household while supporting local farmers and communities.
          </p>
        </div>
        <div className="aboutus-card vision">
          <h2>Vision Statement</h2>
          <p>
            To become India's most trusted online grocery brand by making daily shopping seamless, sustainable, and delightful.
          </p>
        </div>
        <div className="aboutus-card market">
          <h2>Target Market Summary</h2>
          <p>
            We serve busy families, working professionals, and local customers looking for convenient, high-quality grocery delivery.
          </p>
        </div>
        <div className="aboutus-card values">
          <h2>Core Values</h2>
          <ul>
            <li>Freshness First</li>
            <li>Customer Commitment</li>
            <li>Community Support</li>
            <li>Sustainability</li>
          </ul>
        </div>
        <div className="aboutus-card history">
          <h2>Brief Company History</h2>
          <p>
            Founded in a small town in 2023, we started with a local mission that grew into a statewide movement of trust, tech, and taste.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
