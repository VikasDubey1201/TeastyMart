import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IncCart, DecCart, RemoveCart, ClearCart, orderDetails } from './store';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';
import './cartStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const cartObject = useSelector(globalState => globalState.Cart); // Get cart items from Redux store

  // State variables
  const [discountPrice, setDiscountPrice] = useState(0);
  const [couponCodeDiscountPer, setCouponCodeDiscountPer] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderId, setOrderId] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [appliedCouponName, setAppliedCouponName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [countdown, setCountdown] = useState(3);

  // Refs for coupon and email inputs
  const couponCodeRef = useRef();
  const emailRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Countdown effect for redirection after thank you message
  useEffect(() => {
    if (showThankYou && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showThankYou, countdown]);

  // Handle applying coupon codes
  const holdingCouponPer = () => {
    const couponCode = couponCodeRef.current.value.trim().toUpperCase();
    switch (couponCode) {
      case "ROHIT10":
      case "DIWALI10":
        setCouponCodeDiscountPer(10);
        setAppliedCouponName(couponCode);
        break;
      case "ROHIT20":
        setCouponCodeDiscountPer(20);
        setAppliedCouponName(couponCode);
        break;
      case "ROHIT30":
        setCouponCodeDiscountPer(30);
        setAppliedCouponName(couponCode);
        break;
      default:
        alert("❌ Invalid Coupon Code");
        setCouponCodeDiscountPer(0);
        setAppliedCouponName('');
    }
  };

  // Calculate all amount totals and discounts
  const calculatingAmount = () => {
    const totalCartCount = cartObject.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = cartObject.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const manualDiscount = (totalAmount * discountPrice) / 100;
    const couponDiscount = (totalAmount * couponCodeDiscountPer) / 100;
    const priceAfterDiscount = totalAmount - manualDiscount - couponDiscount;
    const taxAmount = (priceAfterDiscount * 5) / 100;
    const finalAmount = priceAfterDiscount + taxAmount;
    return { totalCartCount, totalAmount, manualDiscount, couponDiscount, taxAmount, finalAmount };
  };

  // Destructure values from calculated data
  const { totalCartCount, totalAmount, manualDiscount, couponDiscount, taxAmount, finalAmount } = calculatingAmount();

  // Handle completion of purchase
  const handleCompletePurchase = () => {
    const purchaseDate = new Date().toLocaleString();
    const newOrderId = 'ORD-' + new Date().getTime();
    setOrderId(newOrderId);

    const orderDetailsObject = {
      orderId: newOrderId,
      date: purchaseDate,
      items: [...cartObject],
      finalAmount: finalAmount
    };

    // Template params for EmailJS
    const templateParams = {
      order_id: newOrderId,
      order_date: new Date().toLocaleDateString(),
      order_time: new Date().toLocaleTimeString(),
      email: customerEmail,
      shipping: "50.00",
      tax: `₹${taxAmount.toFixed(2)}`,
      total: `₹${(finalAmount + 50).toFixed(2)}`,
      orders: cartObject.map(item => `
        <div style="margin-bottom:10px;">
          <p><strong>Product:</strong> ${item.name}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          <p><strong>Price:</strong> ₹${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `).join('')
    };

    // Send confirmation email
    emailjs.send('service_7ea1u2a', 'template_6zhb5qd', templateParams, '_Oyzhfx2dvvRF0VOB')
      .then(() => toast.success('✅ Confirmation Email Sent Successfully!'))
      .catch((error) => console.error('❌ Failed to send email:', error));

    dispatch(orderDetails(orderDetailsObject));
    setShowThankYou(true);

    // Celebration fireworks
    for (let i = 0; i < 20; i++) {
      const firework = document.createElement("div");
      firework.className = "firework";
      firework.style.left = Math.random() * 100 + "vw";
      firework.style.animationDelay = `${Math.random() * 1}s`;
      document.body.appendChild(firework);
      setTimeout(() => document.body.removeChild(firework), 1500);
    }

    // Redirect after 5 seconds
    setTimeout(() => {
      dispatch(ClearCart());
      navigate("/order");
    }, 5000);
  };

  // Show thank-you screen
  if (showThankYou) {
    return (
      <div className="thank-you-banner thank-you-animation" style={{ textAlign: 'center', padding: '60px' }}>
        <h1>🎉 Thank You for Your Purchase!</h1>
        <p>Your Order ID is: <strong>{orderId}</strong></p>
        <p>Redirecting to your orders page in <strong>{countdown}</strong> seconds...</p>
      </div>
    );
  }

  // Empty cart condition
  if (!cartObject || cartObject.length === 0) {
    return (
      <div className="empty-cart-section">
        <img src="/Images/emptyBasket.jpg" alt="Empty Basket" className="empty-cart-image" />
        <p className="empty-cart">Cart is empty......</p>
      </div>
    );
  }

  // QR Payment UI
  const qrPaymentUI = (
    <div className="payment-section-center">
      <div className="qr-section">
        <h4>Scan UPI QR to Pay ₹{finalAmount.toFixed(2)}</h4>
        <QRCode
          value={`upi://pay?pa=vikasbdubey121201@okhdfcbank&pn=BigNewBasket&am=${finalAmount.toFixed(2)}&cu=INR`}
          size={180}
        />
        <figcaption style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
          Use any UPI app like PhonePe, Google Pay, Paytm etc.
        </figcaption>
      </div>
    </div>
  );

  // Card Payment UI
  const cardPaymentUI = (
    <div className="card-payment">
      <h4>Enter Your Card Details</h4>
      <input type="text" placeholder="Cardholder Name" />
      <input type="text" placeholder="Card Number" maxLength={16} />
      <input type="text" placeholder="Expiry (MM/YY)" maxLength={5} />
      <input type="password" placeholder="CVV" maxLength={3} />
      <p style={{ fontSize: '13px', color: '#777' }}>
        Your card will be securely processed.
      </p>
    </div>
  );

  return (
    <div className="cart-container">
      <ToastContainer position='top-center' autoClose={2000} />
      <h1>Your Shopping Cart</h1>

      {/* Cart Table */}
      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartObject.map((item, index) => (
            <tr key={index}>
              <td><img src={item.image} alt={item.name} className="cart-img" /></td>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.quantity * item.price}</td>
              <td>
                <button className="inc-btn" onClick={() => dispatch(IncCart(item))}>+</button>
                <button className="dec-btn" onClick={() => dispatch(DecCart(item))} disabled={item.quantity <= 1}>-</button>
                <button className="remove-btn" onClick={() => dispatch(RemoveCart(item))}>REMOVE 🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Section */}
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <div className="summary-line"><span>Total Items:</span><span>{totalCartCount.toFixed(2)}</span></div>
        <div className="summary-line"><span>Total Amount:</span><span>₹{totalAmount.toFixed(2)}</span></div>
        <div className="summary-line"><span>Discount from Buttons:</span><span>₹{manualDiscount.toFixed(2)}</span></div>

        {/* Manual Discount Buttons */}
        <div className="button-group">
          <label>Apply Discount:</label>
          <button onClick={() => setDiscountPrice(10)}>10%</button>
          <button onClick={() => setDiscountPrice(20)}>20%</button>
          <button onClick={() => setDiscountPrice(30)}>30%</button>
        </div>

        <div className="summary-line"><span>Discount from Coupon:</span><span>₹{couponDiscount.toFixed(2)}</span></div>
        {appliedCouponName && (
          <div className="summary-line">
            <span>Applied Coupon:</span>
            <span>{appliedCouponName} ({couponCodeDiscountPer}%)</span>
          </div>
        )}
        <div className="coupon-line">
          <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" />
          <button onClick={holdingCouponPer}>Apply Coupon</button>
        </div>

        <div className="summary-line"><span>Coupon Applied (%):</span><span>{couponCodeDiscountPer}%</span></div>
        <div className="summary-line"><span>Tax Amount (5%):</span><span>₹{taxAmount.toFixed(2)}</span></div>
        <div className="summary-line total-line"><span>Final Price:</span><span>₹{finalAmount.toFixed(2)}</span></div>

        {/* Centered Payment & Email Section */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h3>Select Payment Method:</h3>
          <button onClick={() => setPaymentMethod('qr')} style={{ background: 'skyblue', margin: '5px' }}>QR Code</button>
          <button onClick={() => setPaymentMethod('card')} style={{ background: 'skyblue', margin: '5px' }}>Card Payment</button>

          {paymentMethod === 'qr' && qrPaymentUI}
          {paymentMethod === 'card' && cardPaymentUI}

          {/* Email Input */}
          <div className="email-section" style={{ marginTop: '20px' }}>
            <label>Enter Your Gmail To Receive Order Confirmation:</label>
            <input
              type='email'
              ref={emailRef}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder='you@example.com'
            />
          </div>

          {/* Complete Purchase Button */}
          <h3 style={{ marginTop: '20px' }}>Click Here To Complete</h3>
          <button onClick={handleCompletePurchase} className="complete-purchase-btn" style={{ padding: '10px 30px', fontWeight: 'bold' }}>
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
