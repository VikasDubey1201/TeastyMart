import React from 'react';
import './aboutUsStyle.css';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1>About Us</h1>
          <p>
            <strong>My Big New Basket</strong> is committed to delivering fresh, quality, and affordable groceries to your doorstep.
            We believe in building a healthy, happy, and sustainable shopping experience for everyone.
          </p>
          <p>
            Founded with love in a small town, our mission is to bring big basket convenience to every Indian household.
            With a focus on local sourcing, customer trust, and smart technology, we’re here to revolutionize your daily shopping.
          </p>
        </div>
        <div className="about-image">
          <img src="/Images/about-us.jpg" alt="About Us" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
