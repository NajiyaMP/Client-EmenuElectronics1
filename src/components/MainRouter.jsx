import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Client/Home';
import Aboutus from './Client/Aboutus';
import Viewdetails from './Client/Viewdetails';
import DishesPage from './Client/DishesPage';
import Products from './Client/Products';
import Collection from './Client/Collection';
import Try from './Client/Try';
import Cart from './Client/Cart';
import ImageSlider from './Client/ImageSlider';
import NavbarComponent from './Client/Nav';
import Searchedproducts from './Client/Searchedproducts'; 
import Checkout from './Client/Checkout'; 



function MainRouter() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/admin/getcart`);
      setCartCount(response.data.cartItems.length);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <div>
      <NavbarComponent cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/search/:query" element={<Searchedproducts />} />
        <Route path="/products" element={<Products updateCartCount={updateCartCount} />} />
        <Route path="/view-cart" element={<Cart />} />
        <Route path="/view-details" element={<Viewdetails />} />
        <Route path="/dishes" element={<DishesPage />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/try" element={<Try />} />
        <Route path="/imageSlider" element={<ImageSlider />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/search" element={<Searchedproducts />} />

      </Routes>
    </div>
  );
}

export default MainRouter;





// import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Home from './Client/Home';
// import Aboutus from './Client/Aboutus';
// import Viewdetails from './Client/Viewdetails';
// import DishesPage from './Client/DishesPage';
// import Products from './Client/Products';
// import Collection from './Client/Collection';
// import Try from './Client/Try';
// import ImageSlider from './Client/ImageSlider';
// import NavbarComponent from './Client/Nav';

// function MainRouter() {
//   const [cartCount, setCartCount] = useState(0);

//   const updateCartCount = async () => {
//       try {
//           const response = await axios.get(`${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/admin/getcart`);
//           setCartCount(response.data.length);
//       } catch (error) {
//           console.error('Error fetching cart items:', error);
//       }
//   };
//   return (
//     <div>
//        <NavbarComponent cartCount={cartCount} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/aboutus" element={<Aboutus />} />
//         {/* <Route path="/products" element={<Products />} /> */}
//         <Route path="/products" element={<Products updateCartCount={updateCartCount} />} />

//         <Route path="/view-details" element={<Viewdetails />} /> 
//         <Route path="/dishes" element={<DishesPage />} />  
//         <Route path="/collections" element={<Collection />} /> 
//         <Route path="/try" element={<Try />} /> 
//         <Route path="/imageSlider" element={<ImageSlider />} /> 
//       </Routes>
//     </div>
//   );
// }

// export default MainRouter;
