import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, Button, InputGroup, FormControl,Row,Col } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

// import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import './ViewCartPage.css';  // Import the CSS file

const ViewCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
  const componentRef = useRef();

  const navigate = useNavigate();


  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/getcart`);
      const cartItemsWithQuantity = Array.isArray(response.data.cartItems) 
        ? response.data.cartItems.map(item => ({
            ...item,
            quantity: item.quantity || 1,
          }))
        : [];
      setCartItems(cartItemsWithQuantity);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      await axios.put(`${backendUrl}/admin/updateCart/${id}`, { quantity: newQuantity });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/admin/deleteCart/${id}`);
      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleEnquireNow = () => {
    const cartItemsText = cartItems.map(item => 
      `${item.dishes} - Quantity: ${item.quantity} - Price: Rs ${item.price}`
    ).join('\n');
    
    const message = encodeURIComponent(`Hello, I'd like to enquire about the following items:\n\n${cartItemsText}`);
    const whatsappUrl = `https://wa.me/9607643679?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCouponChange = async (e) => {
    setCouponCode(e.target.value);
  };

  const applyCoupon = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/coupons`);
      const coupons = response.data;
      const selectedCoupon = coupons.find(c => c.couponName === couponCode);

      if (selectedCoupon && totalAmount >= selectedCoupon.minDiscount) {
        const discountAmount = (selectedCoupon.discount / 100) * totalAmount;
        const newTotal = totalAmount - discountAmount;
        setDiscountedTotal(newTotal);
        setCoupon(selectedCoupon);
      } else {
        setDiscountedTotal(totalAmount);
        setCoupon(null);
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleWhatsAppShare = () => {
    const checkoutData = {
      cartItems,
      coupon,
      discountedTotal,
      totalAmount,
    };

    // Redirect to checkout page with state
    navigate('/checkout', { state: checkoutData });
  };

  // const handleWhatsAppShare = async () => {
  //   try {
  //     // Generate the PDF
  //     const canvas = await html2canvas(componentRef.current);
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, 'PNG', 0, 0);
  //     pdf.save('invoice.pdf');
  
  //     // Optionally, you can continue with the WhatsApp sharing part
  //     const dataUrl = canvas.toDataURL('image/png');
  //     const blob = await (await fetch(dataUrl)).blob();
  //     const file = new File([blob], 'invoice.png', { type: 'image/png' });
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     const uploadResponse = await axios.post(`${backendUrl}/admin/upload`, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     const fileUrl = uploadResponse.data.url;
  //     const whatsappUrl = `https://wa.me/9895615511?text=Please%20find%20the%20invoice%20attached%20below:%20${fileUrl}`;
  //     window.open(whatsappUrl, '_blank');
  //   } catch (error) {
  //     console.error('Error sharing invoice on WhatsApp:', error);
  //   }
  // };

  const SumAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container mt-5">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <>
          <Row ref={componentRef}>
            <Col md={8}>
              <Table   hover>
                <thead>
                 
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img 
                          src={`${backendUrl}/images/${item.image[0]}`} 
                          alt={item.dishes} 
                          className="cart-item-image" 
                        />
                      </td>
                      <td>{item.dishes}</td>
                      <td >Rs {item.price}</td>
                      <td >
                        <InputGroup className="quantity-input-group">
                          <Button 
                            variant="outline-secondary" 
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)} 
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <FormControl 
                            type="text" 
                            value={item.quantity} 
                            readOnly 
                            className="text-center"
                          />
                          <Button 
                            variant="outline-secondary" 
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </InputGroup>
                      </td>
                      <td>
                        Rs {item.price * item.quantity}
                      </td>
                      <td>
                        <button 
                        style={{backgroundColor:'white',border:'none'}}
                         
                          onClick={() => handleDelete(item._id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col md={4} >
                  <div className=" border p-3 d-grid gap-4" >
                      <h6>ORDER SUMMARY</h6>
                      <div className="coupon-section">
                        <h6>Promotion code?</h6>
                        <InputGroup>
                          <FormControl
                            placeholder="Enter-coupon"
                            value={couponCode}
                            onChange={handleCouponChange}
                          />
                          <button  style={{backgroundColor:'black',border:'none', marginLeft:'1rem',color:'white'}}  onClick={applyCoupon}>Apply Coupon</button>
                        </InputGroup>
                        {coupon && <p style={{color:'green'}} className="mt-2 "><b>Coupon "{coupon.couponName}" applied. You saved Rs {(totalAmount - discountedTotal).toFixed(2)}!</b></p>}
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h6>Sub Total:</h6>
                        <h6 style={{color:'grey'}}>Rs {SumAmount}</h6>
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h6> Total Inclusive of coupon: </h6>
                        <h6 style={{color:'grey'}}> Rs {discountedTotal || totalAmount}</h6>

                      </div>
                      <div >
                        {/* <Button style={{backgroundColor:'black',border:'none'}} onClick={handlePrint}>Print</Button> */}
                        {/* <Button 
                        style={{backgroundColor:'black',border:'none'}}
                          onClick={handleWhatsAppShare}
                          className="ml-2"
                        >
                          Checkout
                        </Button> */}
                         <div>
                        {/* Your component structure here */}
                        <button className="ml-2 btn-add-cart"
                          // style={{backgroundColor:'black',border:'none'}}
                          onClick={handleWhatsAppShare}
                        >
                          Proceed To Checkout
                        </button>
                      </div>
                      </div>
                  </div>
                 
                
                
            </Col>
           
          </Row>
        
        
          {/* <Button 
           style={{backgroundColor:'black',border:'none'}}
            onClick={handleEnquireNow}
            className="mt-3"
          >
            Enquire Now on WhatsApp
          </Button> */}
        </>
      )}
    </div>
  );
};

export default ViewCartPage;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';
// import { useReactToPrint } from 'react-to-print';
// import { toPng } from 'html-to-image';

// const ViewCartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [couponCode, setCouponCode] = useState('');
//   const [discountedTotal, setDiscountedTotal] = useState(0);
//   const [coupon, setCoupon] = useState(null);
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//   const componentRef = useRef();

//   const fetchCartItems = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/admin/getcart`);
//       const cartItemsWithQuantity = Array.isArray(response.data.cartItems) 
//         ? response.data.cartItems.map(item => ({
//             ...item,
//             quantity: item.quantity || 1,
//           }))
//         : [];
//       setCartItems(cartItemsWithQuantity);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const handleQuantityChange = async (id, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCartItems(prevCartItems =>
//       prevCartItems.map(item =>
//         item._id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//     try {
//       await axios.put(`${backendUrl}/admin/updateCart/${id}`, { quantity: newQuantity });
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/admin/deleteCart/${id}`);
//       setCartItems(cartItems.filter(item => item._id !== id));
//     } catch (error) {
//       console.error('Error deleting cart item:', error);
//     }
//   };

//   const handleEnquireNow = () => {
//     const cartItemsText = cartItems.map(item => 
//       `${item.dishes} - Quantity: ${item.quantity} - Price: Rs ${item.price}`
//     ).join('\n');
    
//     const message = encodeURIComponent(`Hello, I'd like to enquire about the following items:\n\n${cartItemsText}`);
//     const whatsappUrl = `https://wa.me/9607643679?text=${message}`;
    
//     window.open(whatsappUrl, '_blank');
//   };

//   const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

//   const handleCouponChange = async (e) => {
//     setCouponCode(e.target.value);
//   };

//   const applyCoupon = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/admin/coupons`);
//       const coupons = response.data;
//       const selectedCoupon = coupons.find(c => c.couponName === couponCode);

//       if (selectedCoupon && totalAmount >= selectedCoupon.minDiscount) {
//         const discountAmount = (selectedCoupon.discount / 100) * totalAmount;
//         const newTotal = totalAmount - discountAmount;
//         setDiscountedTotal(newTotal);
//         setCoupon(selectedCoupon);
//       } else {
//         setDiscountedTotal(totalAmount);
//         setCoupon(null);
//       }
//     } catch (error) {
//       console.error('Error applying coupon:', error);
//     }
//   };

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

  
//   const handleWhatsAppShare = async () => {
//     try {
//       const dataUrl = await toPng(componentRef.current);
//       const blob = await (await fetch(dataUrl)).blob();
//       const file = new File([blob], 'invoice.png', { type: 'image/png' });
//       const formData = new FormData();
//       formData.append('file', file);
//       const uploadResponse = await axios.post(`${backendUrl}/admin/upload`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       const fileUrl = uploadResponse.data.url;
//       const whatsappUrl = `https://wa.me/9895615511?text=Please%20find%20the%20invoice%20attached%20below:%20${fileUrl}`;
//       window.open(whatsappUrl, '_blank');
//     } catch (error) {
//       console.error('Error sharing invoice on WhatsApp:', error);
//     }
//   };
  
//   // const handleWhatsAppShare = async () => {
//   //   try {
//   //     const dataUrl = await toPng(componentRef.current);
//   //     const blob = await (await fetch(dataUrl)).blob();
//   //     const file = new File([blob], 'invoice.png', { type: 'image/png' });
//   //     const formData = new FormData();
//   //     formData.append('file', file);
//   //     const uploadResponse = await axios.post(`${backendUrl}/admin/upload`, formData, {
//   //       headers: { 'Content-Type': 'multipart/form-data' },
//   //     });
//   //     const fileUrl = uploadResponse.data.url;
//   //     const whatsappUrl = `https://wa.me/9895615511?text=Please%20find%20the%20invoice%20attached%20below:%20${fileUrl}`;
//   //     window.open(whatsappUrl, '_blank');
//   //   } catch (error) {
//   //     console.error('Error sharing invoice on WhatsApp:', error);
//   //   }
//   // };
//   //   // Calculate the total amount
//   const SumAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
// //   const finalAmount = totalAmount - discount;

//   return (
//     <div className="container mt-5">
//       <h2>Cart Items</h2>
//       {cartItems.length === 0 ? (
//         <p>No items in the cart</p>
//       ) : (
//         <>
//           <div ref={componentRef}>
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>Product Image</th>
//                   <th>Product Name</th>
//                   <th>Product Price</th>
//                   <th>Quantity</th>
//                   <th>Total</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item._id}>
//                     <td>
//                       <img 
//                         src={`${backendUrl}/images/${item.image[0]}`} 
//                         alt={item.dishes} 
//                         className="cart-item-image" 
//                         style={{ width: '100px', height: '100px' }}
//                       />
//                     </td>
//                     <td>{item.dishes}</td>
//                     <td>Rs {item.price}</td>
//                     <td>
//                       <InputGroup className="quantity-input-group">
//                         <Button 
//                           variant="outline-secondary" 
//                           onClick={() => handleQuantityChange(item._id, item.quantity - 1)} 
//                           disabled={item.quantity <= 1}
//                         >
//                           -
//                         </Button>
//                         <FormControl 
//                           type="text" 
//                           value={item.quantity} 
//                           readOnly 
//                           className="text-center"
//                         />
//                         <Button 
//                           variant="outline-secondary" 
//                           onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
//                         >
//                           +
//                         </Button>
//                       </InputGroup>
//                     </td>
//                     <td>
//                       Rs {item.price * item.quantity}
//                     </td>
//                     <td>
//                       <Button 
//                         variant="danger" 
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//             <div className="text-right mt-3">
//               <h4>Total Amount: Rs {SumAmount}</h4>
//               <h4> Amount after coupon applied: Rs {discountedTotal || totalAmount}</h4>
//             </div>
//           </div>
//           <div className="coupon-section mt-3">
//             <InputGroup>
//               <FormControl
//                 placeholder="Enter coupon code"
//                 value={couponCode}
//                 onChange={handleCouponChange}
//               />
//               <Button variant="primary" onClick={applyCoupon}>Apply Coupon</Button>
//             </InputGroup>
//             {coupon && <p style={{color:'green'}} className="mt-2 "><b>Coupon "{coupon.couponName}" applied. You saved Rs {(totalAmount - discountedTotal).toFixed(2)}!</b></p>}
//           </div>
//           <div className="text-right mt-3">
//             <Button variant="primary" onClick={handlePrint}>Print Invoice</Button>
//             <Button 
//               variant="success" 
//               onClick={handleWhatsAppShare}
//               className="ml-2"
//             >
//               Share Invoice on WhatsApp
//             </Button>
//           </div>
//           <Button 
//             variant="success" 
//             onClick={handleEnquireNow}
//             className="mt-3"
//           >
//             Enquire Now on WhatsApp
//           </Button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewCartPage;


// --important---
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, InputGroup, FormControl, Form } from 'react-bootstrap';

// const ViewCartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [coupon, setCoupon] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

//   // Function to fetch cart items
//   const fetchCartItems = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/admin/getcart`);
//       console.log('Cart items fetched for ViewCartPage:', response.data);
//       const cartItemsWithQuantity = Array.isArray(response.data.cartItems) 
//         ? response.data.cartItems.map(item => ({
//             ...item,
//             quantity: item.quantity || 1, // Ensure quantity is initialized
//           }))
//         : [];
//       setCartItems(cartItemsWithQuantity);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//     }
//   };

//   // Fetch cart items when component mounts
//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const handleQuantityChange = async (id, newQuantity) => {
//     if (newQuantity < 1) return; // Prevent decrementing below 1

//     setCartItems(prevCartItems =>
//       prevCartItems.map(item =>
//         item._id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );

//     // Send update request to backend
//     try {
//       await axios.put(`${backendUrl}/admin/updateCart/${id}`, { quantity: newQuantity });
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     }
//   };

//   // Function to handle deleting an item from the cart
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/admin/deleteCart/${id}`);
//       setCartItems(cartItems.filter(item => item._id !== id));
//     } catch (error) {
//       console.error('Error deleting cart item:', error);
//     }
//   };

//   const handleEnquireNow = () => {
//     const cartItemsText = cartItems.map(item => 
//       `${item.dishes} - Quantity: ${item.quantity} - Price: Rs ${item.price}`
//     ).join('\n');
    
//     const message = encodeURIComponent(`Hello, I'd like to enquire about the following items:\n\n${cartItemsText}`);
//     const whatsappUrl = `https://wa.me/${9607643679}?text=${message}`;
    
//     window.open(whatsappUrl, '_blank');
//   };

//   const handleApplyCoupon = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/admin/coupons/${coupon}`);
//       const couponData = response.data;
      
//       if (totalAmount >= couponData.minDiscount) {
//         const discountAmount = (totalAmount * couponData.discount) / 100;
//         setDiscount(discountAmount);
//       } else {
//         alert(`Minimum purchase amount for this coupon is Rs ${couponData.minDiscount}`);
//       }
//     } catch (error) {
//       console.error('Error applying coupon:', error);
//       alert('Invalid coupon code');
//     }
//   };

//   // Calculate the total amount
//   const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const finalAmount = totalAmount - discount;

//   return (
//     <div className="container mt-5">
//       <h2>Cart Items</h2>
//       {cartItems.length === 0 ? (
//         <p>No items in the cart</p>
//       ) : (
//         <>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Product Image</th>
//                 <th>Product Name</th>
//                 <th>Product Price</th>
//                 <th>Quantity</th>
//                 <th>Total</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item._id}>
//                   <td>
//                     <img 
//                       src={`${backendUrl}/images/${item.image[0]}`} 
//                       alt={item.dishes} 
//                       className="cart-item-image" 
//                       style={{ width: '100px', height: '100px' }}
//                     />
//                   </td>
//                   <td>{item.dishes}</td>
//                   <td>Rs {item.price}</td>
//                   <td>
//                     <InputGroup className="quantity-input-group">
//                       <Button 
//                         variant="outline-secondary" 
//                         onClick={() => handleQuantityChange(item._id, item.quantity - 1)} 
//                         disabled={item.quantity <= 1}
//                       >
//                         -
//                       </Button>
//                       <FormControl 
//                         type="text" 
//                         value={item.quantity} 
//                         readOnly 
//                         className="text-center"
//                       />
//                       <Button 
//                         variant="outline-secondary" 
//                         onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
//                       >
//                         +
//                       </Button>
//                     </InputGroup>
//                   </td>
//                   <td>
//                     Rs {item.price * item.quantity}
//                   </td>
//                   <td>
//                     <Button 
//                       variant="danger" 
//                       onClick={() => handleDelete(item._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <div className="text-right mt-3">
//             <h4>Total Amount: Rs {totalAmount}</h4>
//             <Form inline className="my-2">
//               <FormControl
//                 type="text"
//                 placeholder="Enter coupon code"
//                 className="mr-sm-2"
//                 value={coupon}
//                 onChange={(e) => setCoupon(e.target.value)}
//               />
//               <Button variant="primary" onClick={handleApplyCoupon}>Apply Coupon</Button>
//             </Form>
//             {discount > 0 && <h4>Discount: Rs {discount}</h4>}
//             <h4>Final Amount: Rs {finalAmount}</h4>
//           </div>
//           <Button 
//             variant="success" 
//             onClick={handleEnquireNow}
//             className="mt-3"
//           >
//             Enquire Now on WhatsApp
//           </Button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewCartPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';

// const ViewCartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

//   // Function to fetch cart items
//   const fetchCartItems = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/admin/getcart`);
//       console.log('Cart items fetched for ViewCartPage:', response.data);
//       // Ensure response.data.cartItems is an array and map over it
//       const cartItemsWithQuantity = Array.isArray(response.data.cartItems) 
//         ? response.data.cartItems.map(item => ({
//             ...item,
//             quantity: item.quantity || 1, // Ensure quantity is initialized
//           }))
//         : [];
//       setCartItems(cartItemsWithQuantity);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//     }
//   };

//   // Fetch cart items when component mounts
//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const handleQuantityChange = async (id, newQuantity) => {
//     if (newQuantity < 1) return; // Prevent decrementing below 1

//     setCartItems(prevCartItems =>
//       prevCartItems.map(item =>
//         item._id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );

//     // Send update request to backend
//     try {
//       await axios.put(`${backendUrl}/admin/updateCart/${id}`, { quantity: newQuantity });
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     }
//   };

//   // Function to handle deleting an item from the cart
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/admin/deleteCart/${id}`);
//       setCartItems(cartItems.filter(item => item._id !== id));
//     } catch (error) {
//       console.error('Error deleting cart item:', error);
//     }
//   };

//   const handleEnquireNow = () => {
//     const cartItemsText = cartItems.map(item => 
//       `${item.dishes} - Quantity: ${item.quantity} - Price: Rs ${item.price}`
//     ).join('\n');
    
//     const message = encodeURIComponent(`Hello, I'd like to enquire about the following items:\n\n${cartItemsText}`);
//     const whatsappUrl = `https://wa.me/${9607643679}?text=${message}`;
    
//     window.open(whatsappUrl, '_blank');
//   };

//   // Calculate the total amount
//   const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

//   return (
//     <div className="container mt-5">
//       <h2>Cart Items</h2>
//       {cartItems.length === 0 ? (
//         <p>No items in the cart</p>
//       ) : (
//         <>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Product Image</th>
//                 <th>Product Name</th>
//                 <th>Product Price</th>
//                 <th>Quantity</th>
//                 <th>Total</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item._id}>
//                   <td>
//                     <img 
//                       src={`${backendUrl}/images/${item.image[0]}`} 
//                       alt={item.dishes} 
//                       className="cart-item-image" 
//                       style={{ width: '100px', height: '100px' }}
//                     />
//                   </td>
//                   <td>{item.dishes}</td>
//                   <td>Rs {item.price}</td>
//                   <td>
//                     <InputGroup className="quantity-input-group">
//                       <Button 
//                         variant="outline-secondary" 
//                         onClick={() => handleQuantityChange(item._id, item.quantity - 1)} 
//                         disabled={item.quantity <= 1}
//                       >
//                         -
//                       </Button>
//                       <FormControl 
//                         type="text" 
//                         value={item.quantity} 
//                         readOnly 
//                         className="text-center"
//                       />
//                       <Button 
//                         variant="outline-secondary" 
//                         onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
//                       >
//                         +
//                       </Button>
//                     </InputGroup>
//                   </td>
//                   <td>
//                     Rs {item.price * item.quantity}
//                   </td>
//                   <td>
//                     <Button 
//                       variant="danger" 
//                       onClick={() => handleDelete(item._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <div className="text-right mt-3">
//             <h4>Total Amount: Rs {totalAmount}</h4>
//           </div>
//           <Button 
//             variant="success" 
//             onClick={handleEnquireNow}
//             className="mt-3"
//           >
//             Enquire Now on WhatsApp
//           </Button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewCartPage;


