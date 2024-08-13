import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import logi from './images/logo/logg.png'
import './Checkout.css'; 
import 'jspdf-autotable'; // Assuming you saved the CSS in CheckoutPage.css

const CheckoutPage = () => {
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
  const location = useLocation();
  const { cartItems, coupon, discountedTotal, totalAmount } = location.state || {};
  const componentRef = React.useRef(null);

//   const handleWhatsAppShare = async () => {
//     try {
//         const messages = cartItems.map(item => {
//             const productMessage = `Dish: ${item.dishes}\nQuantity: ${item.quantity}\nPrice: Rs ${item.price}`;
//             const productImageUrl = `${backendUrl}/images/${item.image}`; // Adjust the path based on your backend setup
//             return `${productMessage}\nImage: ${productImageUrl}`;
//         }).join('\n\n');

//         const whatsappMessage = encodeURIComponent(`Hello, I'd like to enquire about the following items:\n\n${messages}`);
//         const whatsappUrl = `https://wa.me/9895615511?text=${whatsappMessage}`;
//         window.open(whatsappUrl, '_blank');
//     } catch (error) {
//         console.error('Error sharing products on WhatsApp:', error);
//     }
// };

const handleWhatsAppShare = () => {
  try {
      let totalPrice = 0;
      const messages = cartItems.map(item => {
          const productMessage = `Dish: ${item.dishes}\nQuantity: ${item.quantity}\nPrice: Rs ${item.price}`;
          const productImageUrl = `${backendUrl}/images/${item.image}`; // Adjust the path based on your backend setup
          totalPrice += item.price * item.quantity;
          return `${productMessage}\nImage: ${productImageUrl}`;
      });

      // Add total price to the messages array
      messages.push(`\nTotal Price: Rs ${totalPrice.toFixed(2)}`);

      const whatsappMessage = encodeURIComponent(`Hello, I'd like to enquire about the following items:\n\n${messages.join('\n\n')}`);
      const whatsappUrl = `https://wa.me/9895615511?text=${whatsappMessage}`;
      window.open(whatsappUrl, '_blank');
  } catch (error) {
      console.error('Error sharing products on WhatsApp:', error);
  }
};
  // const handleWhatsAppShare = async () => {
  //   try {
  //     // Prepare the items for the PDF
  //     const itemsForPDF = cartItems.map(item => ({
  //       name: item.dishes,
  //       price: item.price,
  //       quantity: item.quantity
  //     }));
  
  //     // Generate the PDF as before...
  //     const pdf = new jsPDF();
  //     pdf.text("Order Summary", 14, 15);
  //     pdf.autoTable({
  //       head: [['Item', 'Price', 'Quantity']],
  //       body: itemsForPDF.map(item => [item.name, `Rs ${item.price}`, item.quantity]),
  //       startY: 20,
  //     });
  
  //     const total = discountedTotal || totalAmount;
  //     pdf.text(`Total: Rs ${total}`, 14, pdf.lastAutoTable.finalY + 10);
  
  //     const pdfBlob = pdf.output('blob');
  //     const formData = new FormData();
  //     formData.append('file', pdfBlob, 'invoice.pdf');
  
  //     // Upload PDF to the server
  //     const uploadResponse = await axios.post(`${backendUrl}/admin/upload`, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  
  //     const fileUrl = uploadResponse.data.url;
  
  //     // Validate the URL
  //     if (!fileUrl || !fileUrl.startsWith(`${backendUrl}/images/`)) {
  //       throw new Error('Invalid file URL received');
  //     }
  
  //     // Create the WhatsApp message and open WhatsApp
  //     const whatsappMessage = encodeURIComponent(`Here's your order summary: ${fileUrl}`);
  //     const whatsappUrl = `https://wa.me/9895615511?text=${whatsappMessage}`;
  //     window.open(whatsappUrl, '_blank');
  //   } catch (error) {
  //     console.error('Error generating and sharing PDF:', error);
  //   }
  // };
  
  
  return (
    <div>
      <div  ref={componentRef} className="container mt-5 " style={{border:'1px solid rgb(239, 230, 230)',padding:'50px'}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <h2>Order Summary</h2>
          <img src={logi} className='logo-imgg'/>
        </div>
        {cartItems?.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
        <> 
        <Table >
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead></thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id} className="cart-itemz">
                <td>
                  <img src={`${backendUrl}/images/${item.image[0]}`} alt={item.dishes} style={{ width: '73px', height: '73px' }} />
                </td>
                <td><h6>{item.dishes}</h6></td>
                <td className="price"><h6>Price: Rs {item.price}</h6></td>
                <td className="quantity"><h6>Quantity: {item.quantity}</h6></td>
                <td className="total"><h6>Total: Rs {item.price * item.quantity}</h6></td>
              </tr>
            ))}
          </tbody>
        </Table>
          {/* <Table ref={componentRef} >
            <tbody>
              <thead></thead>
              <tr>
              {cartItems.map(item => (
                <div key={item._id} className="cart-itemz">
                  <td>
                    <img src={`${backendUrl}/images/${item.image[0]}`} alt={item.dishes} style={{width:'73px',height:'73px'}}/>
                  </td>
                  <td><h6>{item.dishes}</h6></td>
                  <td className="price"><h6>Price: Rs {item.price}</h6></td>
                  <td className="quantity"><h6>Quantity: {item.quantity}</h6></td>
                  <td className="total"><h6>Total: Rs {item.price * item.quantity}</h6></td>
                </div>
              ))}
              </tr>
            </tbody>
            
          </Table> */}
          <div>
          <h6>SUBTOTAL: Rs {totalAmount}</h6>
            {coupon && (
              <h6 style={{color:'green'}}>Coupon "{coupon.couponName}" applied. Discounted Total: Rs {discountedTotal}</h6>
            )}
            
          </div>
          
        </> 
        )}
        <button onClick={handleWhatsAppShare} className="btn-add-cart mt-2" style={{width:'500px'}}>
            Checkout
        </button>
      </div>
     
    </div>
   
  );
};

export default CheckoutPage;


// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Table } from 'react-bootstrap';
// import './Checkout.css';

// const CheckoutPage = () => {
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//   const location = useLocation();
//   const { cartItems, coupon, discountedTotal, totalAmount } = location.state || {};



//   const handleWhatsAppShare = async () => {
//     try {
//       // Generate the PDF
//       const canvas = await html2canvas(componentRef.current);
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF();
//       pdf.addImage(imgData, 'PNG', 0, 0);
//       pdf.save('invoice.pdf');
  
//       // Optionally, you can continue with the WhatsApp sharing part
//       const dataUrl = canvas.toDataURL('image/png');
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

//   return (
//     <div className="container mt-5">
//       <h2>Order Summary</h2>
//       {cartItems?.length === 0 ? (
//         <p>No items in the cart</p>
//       ) : (
//         <Table>
//           {cartItems.map(item => (
//             <div key={item._id} className="cart-itemz">

//               <td>
//                 <img src={`${backendUrl}/images/${item.image[0]}`}  alt={item.dishes}  style={{width:'73px',height:'73px'}}/>
//               </td>
//               <td><h6>{item.dishes}</h6></td>
//               <td><h6>Price: Rs {item.price}</h6></td>
//               <td><h6>Quantity: {item.quantity}</h6></td>
//               <td><h6>Total: Rs {item.price * item.quantity}</h6></td>
//             </div>
//           ))}
//           <h3>Subtotal: Rs {totalAmount}</h3>
//           {coupon && (
//             <h4>Coupon "{coupon.couponName}" applied. Discounted Total: AED {discountedTotal}</h4>
//           )}
//             <Button 
//               style={{backgroundColor:'black',border:'none'}}
//                 onClick={handleWhatsAppShare}
//                 className="ml-2"
//               >
//                 Checkout
//             </Button>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;
