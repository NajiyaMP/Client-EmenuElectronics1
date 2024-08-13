import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader,Row } from 'react-bootstrap';
import Maincategory from './Maincategory';


const DishesPage = () => {
    const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
    const [dishes, setDishes] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get('category');
    const subcategoryId = searchParams.get('subcategory');
    const navigate = useNavigate();

    const handleClick = (item) => {
        navigate('/view-details', { state: { item } });
    };

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                let url = `${backendUrl}/admin/getdishes`;
                if (categoryId) {
                    url += `?category=${categoryId}`;
                } else if (subcategoryId) {
                    url += `?subcategory=${subcategoryId}`;
                }
                const response = await axios.get(url);
                setDishes(response.data);
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };

        fetchDishes();
    }, [backendUrl, categoryId, subcategoryId]);

    const redirectToWhatsApp = (order) => {
        const phoneNumber = '+971585023411';
        const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${order.image[currentImageIndex]}`;
        const productUrl = `${window.location.origin}/view-details?category=${categoryId}&id=${order._id}`;
        const message = `Product: ${imageUrl} Hi, I'd like to order ${order.dishes} for Rs ${order.price}. You can view the product here: ${productUrl}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div>
            <Maincategory />
            <div className='container'>
                <Row>
                    {dishes.map((dish) => (
                        <div key={dish._id} className="col-4 col-lg-3 mb-4">
                            <Card className="custom-card">
                                <CardBody>
                                    <CardHeader className="p-0">
                                        {dish.image && dish.image.length > 0 && (
                                            <img
                                                src={`${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${dish.image[0]}`}
                                                alt={dish.dishes}
                                                className="img-fluid rounded-start"
                                            />
                                        )}
                                    </CardHeader>
                                    <CardFooter>
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ color: "black" }}>{dish.dishes}</h5>
                                            <p className="card-text" style={{ color: "black" }}>Price: Rs {dish.price}</p>
                                            <div className='d-flex'>
                                                <button className='btn-add-cart'  onClick={() => redirectToWhatsApp(dish)}>Buy now</button>
                                                <button className='btn btn-secondary' style={{ marginLeft: '10px' }} onClick={() => handleClick(dish)}>View Details</button>

                                            </div>
                                        </div>
                                    </CardFooter>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default DishesPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardBody, CardFooter, CardHeader} from 'react-bootstrap';
// import Maincategory from './Maincategory'


// const DishesPage = () => {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [dishes, setDishes] = useState([]);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const categoryId = searchParams.get('category');
//     const navigate = useNavigate();

//     const handleClick = (item) => {
//         navigate('/view-details', { state: { item } });
//     };


//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 let url = `${backendUrl}/admin/getdishes`;
//                 if (categoryId) {
//                     url += `?category=${categoryId}`;
//                 }
//                 const response = await axios.get(url);
//                 setDishes(response.data);
//             } catch (error) {
//                 console.error('Error fetching dishes:', error);
//             }
//         };

//         fetchDishes();
//     }, [backendUrl, categoryId]);


//     const redirectToWhatsApp = (order) => {
//       const phoneNumber = '+971585023411';
//       const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${order.image[currentImageIndex]}`;
//       const productUrl = `${window.location.origin}/view-details?category=${categoryId}&id=${order._id}`;
//       const message = `Product: ${imageUrl} Hi, I'd like to order ${order.dishes} for Rs ${order.price}. You can view the product here: ${productUrl}`;
//       const encodedMessage = encodeURIComponent(message);
//       const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//       window.open(whatsappUrl, '_blank');
//   };
//     // const redirectToWhatsApp = (order) => {
//     //   const phoneNumber = '+971585023411';
//     //   const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${order.image[currentImageIndex]}`;
//     //   const message = `Product: ${imageUrl} Hi, I'd like to order  ${order.dishes} for Rs ${order.price}.`;
//     //   const encodedMessage = encodeURIComponent(message);
//     //   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//     //   window.open(whatsappUrl, '_blank');
//     // };
  

//     return (
//         <div>
//           <Maincategory/>
//            <div className='container-fluid d-flex'>
//               {dishes.map((dish) => (
//                 <div key={dish._id} className="col-12 col-lg-3 mb-4 d-flex">
//                   <Card className="custom-card">
//                     <CardBody>
//                       <CardHeader className="p-0">
//                         {dish.image && dish.image.length > 0 && (
//                           <img
//                             src={`${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${dish.image[0]}`}
//                             alt={dish.dishes}
//                             className="img-fluid rounded-start"
//                           />
//                         )}
//                       </CardHeader>
//                       <CardFooter>
//                         <div className="card-body">
//                           <h5 className="card-title" style={{ color: "black" }}>{dish.dishes}</h5>
//                           {/* <p className="card-text" style={{ color: "black" }}>{dish.description}</p> */}
//                           <p className="card-text" style={{ color: "black" }}>Price: Rs {dish.price}</p>
//                           <button className='btn btn-primary' style={{ backgroundColor: '#a8741a', border: 'none' }} onClick={() => redirectToWhatsApp(dish)}>Buy now</button>
//                           <button className='btn btn-secondary' style={{ marginLeft: '10px' }} onClick={() => handleClick(dish)}>View Details</button>
//                         </div>
//                       </CardFooter>
//                     </CardBody>
//                   </Card>
//                 </div>
//               ))}
//             </div>


          

//             {/* <ul>
//                 {dishes.map(dish => (
//                     <li key={dish._id}>
//                         {dish.image && dish.image.length > 0 && (
//                           <img src={`${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${dish.image[0]}`} alt={dish.dishes} />
//                         )}

//                         <h2 style={{color:"black"}}>{dish.dishes}</h2>
//                         <p style={{color:"black"}}>{dish.description}</p>
//                         <p style={{color:"black"}}>Price: ${dish.price}</p>
//                     </li>
//                 ))}
//             </ul> */}
//         </div>
//     );
// };

// export default DishesPage;



