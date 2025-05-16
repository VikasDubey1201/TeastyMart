import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './Color.css';
import Veg from './veg';
import Home from './home';
import Chocolate from './chocolate';
import ContactUs from './contactUs';
import Order from './order';
import Signing from './signing';
import AboutUs from './aboutUs';
import Cart from './cart';
import Milk from './milk';
import NonVegItems from './NonVegItems';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from './store';
import SignUp from './SignUp';
import Loging from './loging';
import NotFound from './NotFound';

function App() {
  const cartObject = useSelector(globalState => globalState.Cart);
  const totalCartCount = cartObject.reduce((totalsum, item) => totalsum + item.quantity, 0);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="navbar-left">
          <img src="/Images/BigNewBaskte.jpg" alt="Logo" className="navbar-logo" />
          <span className="brand-name">Big New Basket</span>

          {/* Search bar inline with brand */}
          <div className="navbar-search">
            <input type="text" placeholder="Search for items..." className="search-bar" />
            <button className="search-button">🔍</button>
          </div>
        </div>

        <div className="navbar-right">
          <Link to="/Order" className="nav-item">🛍️ Orders</Link>
          <Link to="/Cart" className="nav-item">🛒 Cart ({totalCartCount})</Link>
          {isAuthenticated ? (
          <div>
            <span>Welcome, {currentUser.username}</span>
            <button onClick={() => dispatch(logOut())}>Logout</button>
          </div>
        ) : (
          <Link to="/Signing">🙍‍♂️Sign In</Link>
        )}
        </div>
      </header>

      <nav className="sub-navbar">
        <Link to="/Home">🏠 Home</Link>
        <Link to="/veg">🍅 Veg</Link>
        <Link to="/NonVeg">🍗 Non-Veg</Link>
        <Link to="/Milk">🥛 Milk</Link>
        <Link to="/Chocolate">🍫 Chocolate</Link>
        <Link to="/AboutUs">ℹ️ About Us</Link>
        <Link to="/ContactUs">📱 Contact Us</Link>        
      </nav>

      <main className="page-content">
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/NonVeg' element={<NonVegItems />} />
          <Route path='/veg' element={<Veg />} />
          <Route path='/Milk' element={<Milk />} />
          <Route path='/Chocolate' element={<Chocolate />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Order' element={<Order />} />
          <Route path='/Signing' element={<Signing />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Loging' element={<Loging />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
