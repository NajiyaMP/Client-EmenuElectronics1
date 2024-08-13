import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Preloader from './Preloader';
import { Container, Row, Col } from 'react-bootstrap';

function Products({ updateCartCount }) {
    const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
    const [dishes, setDishes] = useState([]);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [loadingImages, setLoadingImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allDishes, setAllDishes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get(`${backendUrl}/admin/getdishes`, { params: { search } });
                const data = response.data;
                setAllDishes(data);
                setDishes(data);
                setLoadingImages(Array(data.length).fill(true));
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${backendUrl}/admin/getcategories`);
                const data = response.data;
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
        fetchDishes();
    }, [search, backendUrl]);

    const handleClick = (item) => {
        navigate('/view-details', { state: { item } });
    };

    const submitAddtocart = async (dish) => {
        try {
            const data = {
                dishes_id: dish._id,
                image: dish.image[0],
                price: dish.price,
                dishes: dish.dishes
            };

            const res = await axios.post(`${backendUrl}/admin/addtocart`, data);

            if (res.status === 201) {
                swal('Success', res.data.message, 'success');
                updateCartCount();
            } else if (res.status === 409) {
                swal('Warning', res.data.message, 'warning');
            } else if (res.status === 401) {
                swal('Error', res.data.message, 'error');
            } else {
                swal('Error', 'Unexpected response from server', 'error');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            if (error.response && error.response.status === 409) {
                swal('Warning', error.response.data.message, 'warning');
            } else {
                swal('Error', 'An error occurred while adding to cart', 'error');
            }
        }
    };

    const handleCategorySelect = (categoryId) => {
        if (categoryId === null) {
            setSelectedCategory(null);
            setDishes(allDishes);  // Display all dishes
        } else {
            setSelectedCategory(categoryId);
            const filteredDishes = allDishes.filter(dish => dish.category === categoryId);
            setDishes(filteredDishes);  // Display filtered dishes
        }
    };
    const handleImageLoad = (index) => {
        setLoadingImages((prev) => {
            const newLoadingState = [...prev];
            newLoadingState[index] = false;
            return newLoadingState;
        });
    };

    const handleImageError = (index) => {
        setLoadingImages((prev) => {
            const newLoadingState = [...prev];
            newLoadingState[index] = false;
            return newLoadingState;
        });
    };

    const redirectToWhatsApp = (dish) => {
        const phoneNumber = '+971585023411';
        const message = `Hi, I'd like to inquire about ${dish.dishes} for Rs ${dish.price}.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Container style={{marginTop:'5rem'}}>
            {/* <div className="product-tab style1 v1">
            <ul className="tab-list">
                <li 
                    className={selectedCategory === null ? 'active' : ''}
                    onClick={() => handleCategorySelect(null)}  // Show all dishes
                >
                    All
                </li>
                {categories.map((category) => (
                    <li 
                        key={category._id} 
                        className={category._id === selectedCategory ? 'active' : ''}
                        onClick={() => handleCategorySelect(category._id)}  // Show filtered dishes by category
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
            </div> */}

            <div className="wrap-imagebox" style={{margin:'7rem 0rem'}}>
                <div className="box-product">
                    <h2 style={{ color: '#f28b00',display:'flex',justifyContent:'center',textAlign:'center' }}><b>Collections</b></h2>

                    <Row>
                        {dishes.length === 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
                                <h5>Products loading...</h5>
                            </div>
                        ) : (
                            dishes.map((dish, index) => (
                                <Col key={index} md={3} className="product-box style2">
                                    <div className="imagebox">
                                        {loadingImages[index] && <Preloader />}
                                        {dish.image.map((image, idx) => {
                                            const imageUrl = `${backendUrl}/images/${encodeURIComponent(image)}`;
                                            return (
                                                <img
                                                    className="card-img-top"
                                                    key={idx}
                                                    src={imageUrl}
                                                    alt={`Image ${idx + 1}`}
                                                    onClick={() => handleClick(dish)}
                                                    onLoad={() => handleImageLoad(index)}
                                                    onError={() => {
                                                        console.error(`Error loading image: ${imageUrl}`);
                                                        handleImageError(index);
                                                    }}
                                                    style={{
                                                        display: loadingImages[index] ? 'none' : 'block',
                                                        cursor: 'pointer',
                                                    }}
                                                    onMouseOver={(e) => {
                                                        if (dish.image.length > 1) {
                                                            e.target.src = `${backendUrl}/images/${encodeURIComponent(dish.image[1])}`;
                                                        }
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.src = `${backendUrl}/images/${encodeURIComponent(dish.image[0])}`;
                                                    }}
                                                />
                                            );
                                        })}
                                        <div className="card-body">
                                            <h6 className="card-title">{dish.dishes}</h6>
                                            <h6 className="card-text"> {dish.price}</h6>
                                            <div>
                                                <button
                                                    className="btn-add-cart"
                                                    onClick={() => redirectToWhatsApp(dish)}
                                                >
                                                    Buy now
                                                </button>
                                            </div>
                                        </div>
                                        <div className="box-bottom">
                                            <div className="btn-add-cart">
                                                <a href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    submitAddtocart(dish);
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-cart4" viewBox="0 0 16 16">
                                                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                                    </svg>
                                                    Add to Cart
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        )}
                    </Row>
                </div>
            </div>
        </Container>
    );
}

export default Products;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';
// import Preloader from './Preloader';
// import { Container, Row, Col } from 'react-bootstrap';

// function Products({ updateCartCount }) {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [dishes, setDishes] = useState([]);
//     const [search, setSearch] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [loadingImages, setLoadingImages] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [allDishes, setAllDishes] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getdishes`, { params: { search } });
//                 const data = response.data;
//                 setDishes(data);
//                 setLoadingImages(Array(data.length).fill(true));
//             } catch (error) {
//                 console.error('Error fetching dishes:', error);
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getcategories`);
//                 const data = response.data;
//                 setCategories(data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategories();
//         fetchDishes();
//     }, [search, backendUrl]);

//     const handleClick = (item) => {
//         navigate('/view-details', { state: { item } });
//     };

//     const submitAddtocart = async (dish) => {
//         try {
//             const data = {
//                 dishes_id: dish._id,
//                 image: dish.image[0],
//                 price: dish.price,
//                 dishes: dish.dishes
//             };

//             const res = await axios.post(`${backendUrl}/admin/addtocart`, data);

//             if (res.status === 201) {
//                 swal('Success', res.data.message, 'success');
//                 updateCartCount();
//             } else if (res.status === 409) {
//                 swal('Warning', res.data.message, 'warning');
//             } else if (res.status === 401) {
//                 swal('Error', res.data.message, 'error');
//             } else {
//                 swal('Error', 'Unexpected response from server', 'error');
//             }
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//             if (error.response && error.response.status === 409) {
//                 swal('Warning', error.response.data.message, 'warning');
//             } else {
//                 swal('Error', 'An error occurred while adding to cart', 'error');
//             }
//         }
//     };

//     const handleCategorySelect = (categoryId) => {
//         if (categoryId === selectedCategory) {
//             // If the same category is clicked again, show all dishes
//             setSelectedCategory(null);
//             setDishes(allDishes);
//         } else {
//             // Filter dishes based on the selected category
//             setSelectedCategory(categoryId);
//             const filteredDishes = allDishes.filter(dish => dish.category === categoryId);
//             setDishes(filteredDishes);
//         }
//     };

//     const handleImageLoad = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false;
//             return newLoadingState;
//         });
//     };

//     const handleImageError = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false;
//             return newLoadingState;
//         });
//     };

//     const redirectToWhatsApp = (dish) => {
//         const phoneNumber = '+971585023411';
//         const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${dish.image[0]}`;
//         const message = `Hi, I'd like to inquire about ${dish.dishes} for  ${dish.price}.`;
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//         window.open(whatsappUrl, '_blank'); 
//     };

//     return (
//         <Container>
//            <div className="product-tab style1 v1">
//                 <ul className="tab-list">
//                     <li 
//                         className={selectedCategory === null ? 'active' : ''}
//                         onClick={() => handleCategorySelect(null)}
//                     >
//                         All
//                     </li>
//                     {categories.map((category) => (
//                         <li 
//                             key={category._id} 
//                             className={category._id === selectedCategory ? 'active' : ''}
//                             onClick={() => handleCategorySelect(category._id)}
//                         >
//                             {category.name}
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <div className="wrap-imagebox  " style={{margin:'7rem 0rem'}}>
//                 <div className="box-product">
//                     <Row>
//                         {dishes.length === 0 ? (
//                             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
//                                 <h5>Products loading...</h5>
//                             </div>
//                         ) : (
//                             dishes.map((dish, index) => (
//                                 <Col key={index} md={3} className="product-box style2">
//                                     <div className="imagebox">
//                                         {loadingImages[index] && <Preloader />}
//                                         {dish.image.map((image, idx) => {
//                                             const imageUrl = `${backendUrl}/images/${encodeURIComponent(image)}`;
//                                             return (
//                                                 <img
//                                                     className="card-img-top"
//                                                     key={idx}
//                                                     src={imageUrl}
//                                                     alt={`Image ${idx + 1}`}
//                                                     onClick={() => handleClick(dish)}
//                                                     onLoad={() => handleImageLoad(index)}
//                                                     onError={() => {
//                                                         console.error(`Error loading image: ${imageUrl}`);
//                                                         handleImageError(index);
//                                                     }}
//                                                     style={{
//                                                         display: loadingImages[index] ? 'none' : 'block',
//                                                         cursor: 'pointer',
//                                                     }}
//                                                     onMouseOver={(e) => {
//                                                         if (dish.image.length > 1) {
//                                                             e.target.src = `${backendUrl}/images/${encodeURIComponent(dish.image[1])}`;
//                                                         }
//                                                     }}
//                                                     onMouseOut={(e) => {
//                                                         e.target.src = `${backendUrl}/images/${encodeURIComponent(dish.image[0])}`;
//                                                     }}
//                                                 />
                                                
//                                             );
                                           
//                                         })}
//                                         <div className="card-body">
//                                             <h6 className="card-title">{dish.dishes}</h6>
//                                             <h6 className="card-text"> {dish.price}</h6>
//                                             <div>
//                                                 {/* <button
//                                                     className='custom-btn'
//                                                     onClick={() => submitAddtocart(dish)}
//                                                 >
//                                                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
//                                                         <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
//                                                     </svg>
//                                                 </button> */}
//                                                 <button
//                                                     className="btn-add-cart"
//                                                     onClick={() => redirectToWhatsApp(dish)}
//                                                 >
//                                                     Buy now
//                                                 </button>
//                                             </div>
//                                         </div>
//                                          {/* <div className="card-body">
//                                                 <h5 className="card-title">{dish.dishes}</h5>
//                                                 <p className="card-text"><b> {dish.price}</b></p>
//                                         </div>  */}
//                                         <div className="box-bottom">
//                                             <div className="btn-add-cart">
//                                                 <a href="#" onClick={(e) => {
//                                                     e.preventDefault();
//                                                     submitAddtocart(dish);
//                                                 }}>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-cart4" viewBox="0 0 16 16">
//                                                     <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
//                                                 </svg>
//                                                     Add to Cart
//                                                 </a>
//                                             </div>
                                           
//                                         </div>
//                                     </div>
                                   
//                                 </Col>
//                             ))
//                         )}
//                     </Row>
//                 </div>
//             </div>
//         </Container>
//     );
// }

// export default Products;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';
// import Preloader from './Preloader';
// import { Container } from 'react-bootstrap';

// function Products({ updateCartCount }) {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [dishes, setDishes] = useState([]);
//     const [search, setSearch] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [loadingImages, setLoadingImages] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getdishes`, { params: { search } });
//                 const data = response.data;
//                 setDishes(data);
//                 setLoadingImages(Array(data.length).fill(true));
//             } catch (error) {
//                 console.error('Error fetching dishes:', error);
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getcategories`);
//                 const data = response.data;
//                 setCategories(data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategories();
//         fetchDishes();
//     }, [search, backendUrl]);

//     const handleClick = (item) => {
//         navigate('/view-details', { state: { item } });
//     };

//     const submitAddtocart = async (dish) => {
//         try {
//             const data = {
//                 dishes_id: dish._id,
//                 image: dish.image[0],
//                 price: dish.price,
//                 dishes: dish.dishes
//             };

//             const res = await axios.post(`${backendUrl}/admin/addtocart`, data);

//             if (res.status === 201) {
//                 swal('Success', res.data.message, 'success');
//                 updateCartCount();
//             } else if (res.status === 409) {
//                 swal('Warning', res.data.message, 'warning');
//             } else if (res.status === 401) {
//                 swal('Error', res.data.message, 'error');
//             } else {
//                 swal('Error', 'Unexpected response from server', 'error');
//             }
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//             if (error.response && error.response.status === 409) {
//                 swal('Warning', error.response.data.message, 'warning');
//             } else {
//                 swal('Error', 'An error occurred while adding to cart', 'error');
//             }
//         }
//     };

//     const handleImageLoad = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false;
//             return newLoadingState;
//         });
//     };

//     const handleImageError = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false;
//             return newLoadingState;
//         });
//     };

//     const redirectToWhatsApp = (dish) => {
//         const phoneNumber = '+971585023411';
//         const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${dish.image[0]}`;
//         const message = `Hi, I'd like to inquire about ${dish.dishes} for Rs ${dish.price}.`;
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     return (
//         <Container>
//             <div className="product-tab style1 v1">
//                 <ul className="tab-list">
//                     {categories.map((category, index) => (
//                         <li key={index} className={category._id === categories[0]._id ? 'active' : ''}>
//                             {category.name}
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <div className="wrap-imagebox">
//                 <div className="box-product">
//                     <div className="rows">
//                         {dishes.length === 0 ? (
//                             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
//                                 <h5>Products loading...</h5>
//                             </div>
//                         ) : (
//                             dishes.map((dish, index) => (
//                                 <div key={index} className="product-box style2 col-md-4">
//                                     <div className="imagebox">
//                                         {loadingImages[index] && <Preloader />}
//                                         {dish.image.map((image, idx) => {
//                                             const imageUrl = `${backendUrl}/images/${encodeURIComponent(image)}`;
//                                             return (
//                                                 <img
//                                                     className="card-img-top"
//                                                     key={idx}
//                                                     src={imageUrl}
//                                                     alt={`Image ${idx + 1}`}
//                                                     onClick={() => handleClick(dish)}
//                                                     onLoad={() => handleImageLoad(index)}
//                                                     onError={() => {
//                                                         console.error(`Error loading image: ${imageUrl}`);
//                                                         handleImageError(index);
//                                                     }}
//                                                     style={{
//                                                         display: loadingImages[index] ? 'none' : 'block',
//                                                         cursor: 'pointer',
//                                                     }}
//                                                     onMouseOver={(e) => {
//                                                         if (dish.image.length > 1) {
//                                                             e.target.src = `${backendUrl}/images/${encodeURIComponent(dish.image[1])}`;
//                                                         }
//                                                     }}
//                                                     onMouseOut={(e) => {
//                                                         e.target.src = `${backendUrl}/images/${encodeURIComponent(dish.image[0])}`;
//                                                     }}
//                                                 />
//                                             );
//                                         })}
//                                         <div className="box-bottom">
//                                             <div className="btn-add-cart">
//                                                 <a href="#" onClick={(e) => {
//                                                     e.preventDefault();
//                                                     submitAddtocart(dish);
//                                                 }}>
//                                                     <img src="cart-icon.png" alt="Cart" />
//                                                     Add to Cart
//                                                 </a>
//                                             </div>
//                                             <div className="compare-wishlist">
//                                                 <a href="#" className="compare">
//                                                     <img src="compare-icon.png" alt="Compare" />
//                                                     Compare
//                                                 </a>
//                                                 <a href="#" className="wishlist">
//                                                     <img src="wishlist-icon.png" alt="Wishlist" />
//                                                     Wishlist
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="card-body">
//                                         <h6 className="card-title">{dish.dishes}</h6>
//                                         <h6 className="card-text">Rs {dish.price}</h6>
//                                         <div className='d-flex'>
//                                             <button
//                                                 className='custom-btn'
//                                                 onClick={() => submitAddtocart(dish)}
//                                             >
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
//                                                     <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
//                                                 </svg>
//                                             </button>
//                                             <button
//                                                 className='custom-btn'
//                                                 onClick={() => redirectToWhatsApp(dish)}
//                                             >
//                                                 Buy now
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Container>
//     );
// }

// export default Products;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';
// import Preloader from './Preloader'; // Import the Preloader component
// import { Container } from 'react-bootstrap';

// function Products({ updateCartCount }) {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [dishes, setDishes] = useState([]);
//     const [search, setSearch] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [loadingImages, setLoadingImages] = useState([]);

//     const navigate = useNavigate();

//     console.log(dishes, 'this is the dishes');
//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getdishes`, { params: { search } });
//                 const data = response.data;
//                 setDishes(data);
//                 setLoadingImages(Array(data.length).fill(true));
//                 console.log(data, "Fetched dishes");
//             } catch (error) {
//                 console.error('Error fetching dishes:', error);
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getcategories`);
//                 const data = response.data;
//                 setCategories(data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategories();
//         fetchDishes();
//     }, [search, backendUrl]);

//     const handleClick = (item) => {
//         navigate('/view-details', { state: { item } });
//     };

//     // const submitAddtocart = async (dish) => {
//     //     try {
//     //         const data = {
//     //             dishes_id: dish._id,
//     //             image: dish.image[0], // Assuming you want to store the first image URL
//     //             price: dish.price,
//     //             dishes: dish.dishes
//     //         };

//     //         const res = await axios.post(`${backendUrl}/admin/addtocart`, data);

//     //         if (res.status === 201) {
//     //             swal('Success', res.data.message, 'success');
//     //             updateCartCount(); // Update cart count after successful addition
//     //         } else if (res.status === 409) {
//     //             swal('Warning', res.data.message, 'warning');
//     //         } else if (res.status === 401) {
//     //             swal('Error', res.data.message, 'error');
//     //         }
//     //     } catch (error) {
//     //         console.error('Error adding to cart:', error);
//     //         if (error.response && error.response.status === 409) {
//     //             swal('Warning', error.response.data.message, 'warning');
//     //         } else {
//     //             swal('Error', 'An error occurred while adding to cart', 'error');
//     //         }
//     //     }
//     // };


//     const submitAddtocart = async (dish) => {
//         try {
//             const data = {
//                 dishes_id: dish._id,
//                 image: dish.image[0],
//                 price: dish.price,
//                 dishes: dish.dishes
//             };
    
//             const res = await axios.post(`${backendUrl}/admin/addtocart`, data);
//             console.log('Response:', res); // Debugging log
    
//             if (res.status === 201) {
//                 swal('Success', res.data.message, 'success');
//                 updateCartCount();
//             } else if (res.status === 409) {
//                 swal('Warning', res.data.message, 'warning');
//             } else if (res.status === 401) {
//                 swal('Error', res.data.message, 'error');
//             } else {
//                 swal('Error', 'Unexpected response from server', 'error'); // Catch unexpected responses
//             }
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//             if (error.response && error.response.status === 409) {
//                 swal('Warning', error.response.data.message, 'warning');
//             } else {
//                 swal('Error', 'An error occurred while adding to cart', 'error');
//             }
//         }
//     };

//     const handleImageLoad = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false;
//             return newLoadingState;
//         });
//     };

//     const handleImageError = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false; // Remove preloader on error as well
//             return newLoadingState;
//         });
//     };

//     const redirectToWhatsApp = (dish) => {
//         const phoneNumber = '+971585023411';
//         const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${dish.image[0]}`;
//         const message = `Hi, I'd like to inquire about ${dish.dishes} for Rs ${dish.price}.`;
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     return (
//         <Container>
//             <div className="container-fluid mt-5 mb-3">
//                 <div className="row">
//                     <div style={{display:"flex",textAlign:'center',justifyContent:'center'}}>
//                     <h2 style={{ color: 'black' }}>Collections</h2>
//                     </div>
//                 </div>
//             </div>

//             <div className="container mb-5">
//                 <div className="row">
//                     {dishes.length === 0 ? (
//                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
//                             <h5>Products loading...</h5>
//                         </div>
//                     ) : (
//                         dishes.map((dish, index) => (
//                             <div key={index} className="col-12 col-lg-3 mb-4">
//                                 <div className="card" style={{  backgroundColor: "rgb(249 247 247)",border:"1px solid #f4f1f1"}}>
//                                     <div style={{ position: 'relative' }}>
//                                         {loadingImages[index] && <Preloader />}
//                                         {dish.image.map((image, idx) => {
//                                             const imageUrl = `${backendUrl}/images/${encodeURIComponent(image)}`;
//                                             console.log(`Image URL: ${imageUrl}`); // Debugging log for the image URL

//                                             return (
//                                                 <img
//                                                     className="card-img-top"
//                                                     key={idx}
//                                                     src={imageUrl}
//                                                     alt={`Image ${idx + 1}`}
//                                                     onClick={() => handleClick(dish)}
//                                                     onLoad={() => handleImageLoad(index)}
//                                                     onError={() => {
//                                                         console.error(`Error loading image: ${imageUrl}`); // Error log for image loading
//                                                         handleImageError(index);
//                                                     }}
//                                                     style={{
//                                                         display: loadingImages[index] ? 'none' : 'block',
//                                                         cursor: 'pointer',
//                                                     }}
//                                                     onMouseOver={(e) => {
//                                                         if (dish.image.length > 1) {
//                                                             e.target.src = `${backendUrl}/images/${encodeURIComponent(dish.image[1])}`;
//                                                         }
//                                                     }}
//                                                     onMouseOut={(e) => {
//                                                         e.target.src = `${backendUrl}/images/${encodeURIComponent(dish.image[0])}`;
//                                                     }}
//                                                 />
//                                             );
//                                         })}
//                                     </div>
//                                     <div className="card-body">
//                                         <h6 className="card-title">{dish.dishes}</h6>
//                                         <h6 className="card-text">Rs {dish.price}</h6>
//                                         <div className='d-flex'>
//                                             <button
//                                                 className='custom-btn'
//                                                 onClick={() => submitAddtocart(dish)}
//                                             >
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
//                                                     <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
//                                                 </svg>
//                                             </button>
//                                             <button
//                                                 className='custom-btn'
//                                                 onClick={() => redirectToWhatsApp(dish)}
//                                             >
//                                                 Buy now
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </Container>
//     );
// }

// export default Products;




// // orginal
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';
// import Preloader from './Preloader'; // Import the Preloader component

// function Products({updateCartCount }) { // Receive updateCartCount as a prop
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [dishes, setDishes] = useState([]);
//     const [search, setSearch] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [loadingImages, setLoadingImages] = useState([]);

//     const navigate = useNavigate();

//     console.log(dishes,'this is the dishes')
//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getdishes`, { params: { search } });
//                 const data = response.data;
//                 setDishes(data);
//                 setLoadingImages(Array(data.length).fill(true));
//                 console.log(data, "Fetched dishes");
//             } catch (error) {
//                 console.error('Error fetching dishes:', error);
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getcategories`);
//                 const data = response.data;
//                 setCategories(data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategories();
//         fetchDishes();
//     }, [search, backendUrl]);

//     const handleClick = (item) => {
//         navigate('/view-details', { state: { item } });
//     };

//     const submitAddtocart = async (dish) => {
//       try {
//         const data = {
//           dishes_id: dish._id,
//           image: dish.image[0], // Assuming you want to store the first image URL
//           price: dish.price,
//           dishes: dish.dishes
//         };
  
//         const res = await axios.post(`${backendUrl}/admin/addtocart`, data);
  
//         if (res.status === 201) {
//           swal('Success', res.data.message, 'success');
//           updateCartCount(); // Update cart count after successful addition
//         } else if (res.status === 409) {
//           swal('Warning', res.data.message, 'warning');
//         } else if (res.status === 401) {
//           swal('Error', res.data.message, 'error');
//         }
//       } catch (error) {
//         console.error('Error adding to cart:', error);
//         if (error.response && error.response.status === 409) {
//           swal('Warning', error.response.data.message, 'warning');
//         } else {
//           swal('Error', 'An error occurred while adding to cart', 'error');
//         }
//       }
//     };
    
    

//     const handleImageLoad = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false;
//             return newLoadingState;
//         });
//     };

//     const handleImageError = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false; // Remove preloader on error as well
//             return newLoadingState;
//         });
//     };

//     const redirectToWhatsApp = (dish) => {
//         const phoneNumber = '+971585023411';
//         const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${dish.image[0]}`;
//         const message = `Hi, I'd like to inquire about ${dish.dishes} for Rs ${dish.price}.`;
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     return (
//         <div>
//             <div className="container-fluid banner-2">
//                 <div className="row">
//                     <div>
//                         <h1 style={{ color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'slick' ,padding:'30px'}}>Collections</h1>
//                     </div>
//                 </div>
//             </div>

//             <div className="container">
//     <div className="row">
//         {dishes.length === 0 ? (
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
//                 <h5>Products loading...</h5>
//             </div>
//         ) : (
//             dishes.map((dish, index) => (
//                 <div key={index} className="col-12 col-lg-3 mb-4">
//               <div className="card">
//                 <div style={{ position: 'relative' }}>
//                   {loadingImages[index] && <Preloader />}
//                   {dish.image.map((image, idx) => {
//                     const imageUrl = `${backendUrl}/images/${encodeURIComponent(dish.image)}`;
//                     console.log(`Image URL: ${imageUrl}`); // Debugging log for the image URL

//                     return (
//                       <img
//                         className="card-img-top"
//                         key={idx}
//                         src={imageUrl}
//                         alt={`Image ${idx + 1}`}
//                         onClick={() => handleClick(dish)}
//                         onLoad={() => handleImageLoad(index)}
//                         onError={() => {
//                           console.error(`Error loading image: ${imageUrl}`); // Error log for image loading
//                           handleImageError(index);
//                         }}
//                         style={{
//                           display: loadingImages[index] ? 'none' : 'block',
//                           cursor: 'pointer',
//                           width: '100%',
//                           height: '300px',
//                           objectFit: 'cover',
//                         }}
//                         onMouseOver={(e) => {
//                           if (dish.image.length > 1) {
//                             e.target.src = `${backendUrl}/images/${encodeURIComponent(image[0])}`;
//                           }
//                         }}
//                         onMouseOut={(e) => {
//                           e.target.src = `${backendUrl}/images/${encodeURIComponent(image[1])}`;
//                         }}
//                       />
//                     );
//                   })}
//                 </div>
//                 <div className="card-body">
//                   <h5 className="card-title">{dish.dishes}</h5>
//                   <p className="card-text"><b>Rs {dish.price}</b></p>
//                   <div className='d-flex'>
//                     <button
//                       className='custom-btn'
//                       onClick={() => submitAddtocart(dish)}
//                       style={{ backgroundColor: 'rgb(220 217 212)', border: 'none', color: 'white' }}
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
//                         <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
//                       </svg>
//                     </button>
//                     <button
//                       className='custom-btn'
//                       style={{ backgroundColor: 'rgb(135 131 124)', border: 'none', color: 'white' }}
//                       onClick={() => redirectToWhatsApp(dish)}
//                     >
//                       <b>Buy now</b>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             ))
//         )}
//     </div>
// </div>

//         </div>
//     );
// }

// export default Products;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';
// import Preloader from './Preloader'; // Import the Preloader component

// function Products({ updateCartCount }) { // Receive updateCartCount as a prop
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [dishes, setDishes] = useState([]);
//     const [search, setSearch] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [loadingImages, setLoadingImages] = useState([]);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getdishes`, { params: { search } });
//                 const data = response.data;
//                 setDishes(data);
//                 setLoadingImages(Array(data.length).fill(true));
//                 console.log(data, "Fetched dishes");
//             } catch (error) {
//                 console.error('Error fetching dishes:', error);
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getcategories`);
//                 const data = response.data;
//                 setCategories(data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategories();
//         fetchDishes();
//     }, [search, backendUrl]);

//     const handleClick = (item) => {
//         navigate('/view-details', { state: { item } });
//     };

//     const submitAddtocart = async (dishId) => {
//         try {
//             const data = {
//                 dishes_id: dishId,
//             };
    
//             const res = await axios.post(`${backendUrl}/admin/addtocart`, data);
    
//             if (res.status === 201) {
//                 swal('Success', res.data.message, 'success');
//                 updateCartCount(); // Update cart count after successful addition
//             } else if (res.status === 409) {
//                 swal('Warning', res.data.message, 'warning');
//             } else if (res.status === 401) {
//                 swal('Error', res.data.message, 'error');
//             }
//         } catch (error) {
//             // Handle network errors or other unexpected errors
//             console.error('Error adding to cart:', error);
    
//             // Display a generic error message using sweetAlert
//             swal('Error', 'An error occurred while adding to cart', 'error');
//         }
//     };

//     const handleImageLoad = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false;
//             return newLoadingState;
//         });
//     };

//     const handleImageError = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false; // Remove preloader on error as well
//             return newLoadingState;
//         });
//     };

//     const redirectToWhatsApp = (dish) => {
//         const phoneNumber = '+971585023411';
//         const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${dish.image[currentImageIndex]}`;
//         const message = `Hi, I'd like to dish ${imageUrl} ${dish.dishes} for Rs ${dish.price}.`;
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     return (
//         <div>
//             <div className="container-fluid banner-2">
//                 <div className="row">
//                     <div>
//                         <h1 style={{ color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'slick' ,padding:'30px'}}>Collections</h1>
//                     </div>
//                 </div>
//             </div>

//             <div className="container">
//                 <div className="row">
//                     {dishes.length === 0 ? (
//                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
//                             <Preloader />
//                             <h5>products loading</h5>
//                         </div>
//                     ) : (
//                         dishes.map((dish, index) => (
//                             <div key={index} className="col-12 col-lg-3 mb-4">
//                                 <div className="card">
//                                     <div style={{ position: 'relative' }}>
//                                         {loadingImages[index] && <Preloader />}
//                                         <img
//                                             className="card-img-top"
//                                             src={`${backendUrl}/images/${dish.image[0]}`}
//                                             alt={dish.dishes}
//                                             onClick={() => handleClick(dish)}
//                                             onLoad={() => handleImageLoad(index)}
//                                             onError={() => handleImageError(index)}
//                                             style={{ display: loadingImages[index] ? 'none' : 'block', cursor: 'pointer', width: '100%', height: '200px', objectFit: 'cover' }}
//                                             onMouseOver={(e) => {
//                                                 if (dish.image.length > 1) {
//                                                     e.target.src = `${backendUrl}/images/${dish.image[1]}`;
//                                                 }
//                                             }}
//                                             onMouseOut={(e) => {
//                                                 e.target.src = `${backendUrl}/images/${dish.image[0]}`;
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="card-body">
//                                         <h5 className="card-title">{dish.dishes}</h5>
//                                         <p className="card-text"><b>Rs {dish.price}</b></p>
//                                         <div className='d-flex'>
//                                             <button className='custom-btn' onClick={() => submitAddtocart(dish._id)} style={{ backgroundColor: 'rgb(220 217 212)', border: 'none',color:'white' }}>
//                                                 Add to Cart
//                                             </button>
//                                             <button className='custom-btn' style={{ backgroundColor: 'rgb(135 131 124)', border: 'none',color:'white' }} onClick={() => redirectToWhatsApp(dish)}><b>Buy now</b></button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Products;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Preloader from './Preloader'; // Import the Preloader component

// function Products () {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [dishes, setDishes] = useState([]);
//     const [search, setSearch] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [loadingImages, setLoadingImages] = useState([]);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);


//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getdishes`, { params: { search } });
//                 const data = response.data;
//                 setDishes(data);
//                 setLoadingImages(Array(data.length).fill(true));
//                 console.log(data, "Fetched dishes");
//             } catch (error) {
//                 console.error('Error fetching dishes:', error);
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getcategories`);
//                 const data = response.data;
//                 setCategories(data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategories();
//         fetchDishes();
//     }, [search, backendUrl]);

//     const handleClick = (item) => {
//         navigate('/view-details', { state: { item } });
//     };


//     const submitAddtocart = (e) => {
//         e.preventDefault();

//         const data={
//             dishes_id:dishes.id,
//         }
//         axios.post(`${backendUrl}/admin/addtocart`,data).then(res=>{
//             if(res.data.status===201){
//                 swal('success',res.data.message,"success");
//             }else if(res.data.status===409)
//             {
//                 swal('warning',res.data.message,"warning");
//             }
//             else if(res.data.status===401)
//             {
//                 swal('error',res.data.message,"error");
//             }


            
//         })
//     }


//     const handleImageLoad = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false;
//             return newLoadingState;
//         });
//     };

//     const handleImageError = (index) => {
//         setLoadingImages((prev) => {
//             const newLoadingState = [...prev];
//             newLoadingState[index] = false; // Remove preloader on error as well
//             return newLoadingState;
//         });
//     };


//     const redirectToWhatsApp = (dish) => {
//         const phoneNumber = '+971585023411';
//         const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${dish.image[currentImageIndex]}`;
//         const message = `Hi, I'd like to dish ${imageUrl} ${dish.dishes} for Rs ${dish.price}.`;
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//         window.open(whatsappUrl, '_blank');
//       };
//     return (
//         <div>
//             <div className="container-fluid banner-2">
//                 <div className="row">
//                     <div>
//                         <h1 style={{ color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'slick' ,padding:'30px'}}>Collections</h1>

//                     </div>
//                 </div>
//             </div>

//             <div className="container">
//                 <div className="row">
//                     {dishes.length === 0 ? (
//                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
//                             <Preloader />
//                             <h5>products loading</h5>
//                         </div>
//                     ) : (
//                         dishes.map((dish, index) => (
//                             <div key={index} className="col-12 col-lg-3 mb-4">
//                                 <div className="card">
//                                     <div style={{ position: 'relative' }}>
//                                         {loadingImages[index] && <Preloader />}
//                                         <img
//                                             className="card-img-top"
//                                             src={`${backendUrl}/images/${dish.image[0]}`}
//                                             alt={dish.dishes}
//                                             onClick={() => handleClick(dish)}
//                                             onLoad={() => handleImageLoad(index)}
//                                             onError={() => handleImageError(index)}
//                                             style={{ display: loadingImages[index] ? 'none' : 'block', cursor: 'pointer', width: '100%', height: '200px', objectFit: 'cover' }}
//                                             onMouseOver={(e) => {
//                                                 if (dish.image.length > 1) {
//                                                     e.target.src = `${backendUrl}/images/${dish.image[1]}`;
//                                                 }
//                                             }}
//                                             onMouseOut={(e) => {
//                                                 e.target.src = `${backendUrl}/images/${dish.image[0]}`;
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="card-body">
//                                         <h5 className="card-title">{dish.dishes}</h5>
//                                         <p className="card-text"><b>Rs {dish.price}</b></p>
//                                         <div className='d-flex'>
//                                         <button className='custom-btn'   onClick={submitAddtocart} style={{ backgroundColor: 'rgb(220 217 212)', border: 'none',color:'white' }}  >
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
//                                                 <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
//                                             </svg>
//                                         </button>

//                                         <button className='custom-btn' style={{ backgroundColor: 'rgb(135 131 124)', border: 'none',color:'white' }} onClick={() => redirectToWhatsApp(dish)}><b>Buy now</b></button>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Products;





// //PRODUCTS by addin try camere
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import TryItOnModal from './Try';

// function Products() {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [dishes, setDishes] = useState([]);
//     const [search, setSearch] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     const navigate = useNavigate();

//     const handleClick = (item) => {
//         navigate('/view-details', { state: { item } });
//     };

//     const handleTryItOn = (product) => {
//         setSelectedProduct(product);
//         setShowModal(true);
//     };

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getdishes`, { params: { search } });
//                 const data = response.data;
//                 setDishes(data);
//             } catch (error) {
//                 console.error('Error fetching dishes:', error);
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getcategories`);
//                 const data = response.data;
//                 setCategories(data);
//             } catch (err) {
//                 console.error('Error fetching categories:', err);
//             }
//         };

//         fetchCategories();
//         fetchDishes();
//     }, [search, backendUrl]);

//     const redirectToWhatsApp = (order) => {
//         const phoneNumber = '+971585023411';
//         const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${order.image[0]}`;
//         const message = `Hi, I'd like to order ${order.dishes} for Rs ${order.price}.`;
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     const handleImageError = (e) => {
//         e.target.onerror = null; // Prevents infinite loop
//         e.target.src = 'path/to/default-image.jpg'; // Ensure this path is correct
//     };

//     return (
//         <div className='bg-dark'>
//             <div className="container-fluid banner-2">
//                 <div className="row">
//                     <div className="col-12"></div>
//                 </div>
//             </div>

//             <div className="container">
//                 <div className="row">
//                     <h1 style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'slick' }}>Collections</h1>
//                     {dishes.length === 0 ? (
//                         <p style={{ color: 'white' }}>No dishes found.</p>
//                     ) : (
//                         dishes.map((dish, index) => (
//                             <div key={index} className="col-12 col-lg-3 mb-4">
//                                 <div className="card">
//                                     <img
//                                         className="card-img-top"
//                                         src={`${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${dish.image[0]}`}
//                                         alt={dish.dishes}
//                                         onClick={() => handleClick(dish)}
//                                         style={{ cursor: 'pointer', width: '100%', height: '200px', objectFit: 'cover' }}
//                                         onError={handleImageError}
//                                         onMouseOver={(e) => {
//                                             if (dish.image.length > 1) {
//                                                 e.target.src = `${backendUrl}/images/${dish.image[1]}`;
//                                             }
//                                         }}
//                                         onMouseOut={(e) => {
//                                             e.target.src = `${backendUrl}/images/${dish.image[0]}`;
//                                         }}
//                                     />
//                                     <div className="card-body">
//                                         <h5 className="card-title" style={{ color: 'brown' }}>{dish.dishes}</h5>
//                                         <p className="card-text" style={{ color: 'brown' }}><b>Rs {dish.price}</b></p>
//                                         <button className='btn btn-primary' style={{ backgroundColor: '#a8741a', border: 'none' }} onClick={() => redirectToWhatsApp(dish)}>Buy now</button>
//                                         <button className='btn btn-secondary mt-2' onClick={() => handleTryItOn(dish)}>Try It On</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>

//             {selectedProduct && (
//                 <TryItOnModal
//                     show={showModal}
//                     handleClose={() => setShowModal(false)}
//                     product={selectedProduct}
//                 />
//             )}
//         </div>
//     );
// }

// export default Products;







// orginal
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Products() {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [dishes, setDishes] = useState([]);
//     const [search, setSearch] = useState('');
//     const [categories, setCategories] = useState([]);

//     const navigate = useNavigate();

//     const handleClick = (item) => {
//         navigate('/view-details', { state: { item } });
//     };

//     useEffect(() => {
//         const fetchDishes = async () => {
//             console.log(search, "search");
        
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getdishes/?search=${search}`);
//                 const data = response.data;
//                 setDishes(data);
//                 console.log(data, "Fetched dishes");
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getcategories`);
//                 const data = response.data;
//                 setCategories(data);
//             } catch (err) {
//                 console.log(err);
//             }
//         };

//         fetchCategories();
//         fetchDishes();
//     }, [search, backendUrl]);

//     const redirectToWhatsApp = (order) => {
//         const phoneNumber = '+919778164782'; 
//         const message = `Hi, I'd like to order ${order.dishes} for ₹${order.price}`;
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     return (
//         <div className='bg-dark'>
//             <div className="container-fluid banner-2">
//                 <div className="row">
//                     <div className="col-12"></div>
//                 </div>
//             </div>

//             <div className="container">
//                 <div className="row">
//                     <h1 style={{color:'white'}}>Collections</h1>
//                     {/* <div className="col-12 my-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                         <h1 style={{ textAlign: 'center' }} className='montserrat-400'>Products</h1>
//                         <select className='montserrat-400' onChange={(e) => setSearch(e.target.value)}>
//                             <option value="">Select by categories</option>
//                             {categories.map((category, index) => (
//                                 <option key={index} value={category._id}>{category.categories}</option>
//                             ))}
//                         </select>
//                     </div> */}
//                     {dishes.map((dish, index) => (
//                         <div key={index} className="col-12 col-lg-3 mb-4">
//                             <div className="card">
//                                 <div 
//                                     className="card-img-top" 
//                                     style={{ height: '200px', overflow: 'hidden', position: 'relative' }}
//                                     onMouseOver={(e) => {
//                                         if (dish.image.length > 1) {
//                                             e.target.src = `${backendUrl}/images/${dish.image[1]}`;
//                                         }
//                                     }}
//                                     onMouseOut={(e) => {
//                                         e.target.src = `${backendUrl}/images/${dish.image[0]}`;
//                                     }}
//                                 >
//                                     <img
//                                         className="dishimg"
//                                         src={`${backendUrl}/images/${dish.image[0]}`}
//                                         onClick={() => handleClick(dish)}
//                                         style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
//                                         alt={dish.dishes}
//                                         onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/default-image.jpg'; }}
//                                     />
//                                 </div>
//                                 <div className="card-body">
//                                     <h5 className="card-title" style={{ color: 'brown' }}>{dish.dishes}</h5>
//                                     <p className="card-text" style={{ color: 'brown' }}><b>Rs {dish.price}</b></p>
//                                     {/* <p className="card-text" style={{ color: 'brown' }}>{dish.description}</p> */}
//                                     <button className='btn btn-primary' style={{backgroundColor:'#a8741a',border:'none'}} onClick={() => redirectToWhatsApp(dish)}>Buy now</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Products;



// import React, { useEffect, useState } from 'react';
// // import Nav from './Nav';
// import axios from 'axios';
// // import Footer from './Footer';
// import { useNavigate } from 'react-router-dom';



// function Products() {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [dishes, setDishes] = useState([]);
//     const [search, setSeacrh] = useState('')
//     const [getCategories, setGetCategories] = useState([]);

//     const navigate = useNavigate();
//     const handleClick = (item) => {
//       navigate('/view-details', { state: { item } });
//     };

 

//     useEffect(() => {
//         const fetchData = async () => {
//             console.log(search,"search")
        
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getdishes/?search=${search}`);
//                 const data = response.data;
//                 setDishes(data);
//                 console.log(data,"hellooo")
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         const fetch = async()=>{
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getcategories`);
//                 const data = response.data;
//                 setGetCategories(data);
               
//               } catch (err) {
//                 console.log(err);
//               }
//         }
//         fetch()
//         fetchData();
//     }, [search, backendUrl]);


//     const redirectToWhatsApp = (order) => {
//         const phoneNumber = '+919778164782'; 
//         const message = `Hi, I'd like to order ${order.dishes}  ₹ ${order.price}`;
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//         window.open(whatsappUrl, '_blank');
//     };

//   return (
//     <div className='bg-dark'>
//         <div className="container-fluid banner-2">
//             <div className="row">
//                 <div className="col-12">

//                 </div>
//             </div>
//         </div>

//         <div className="container">
//                 <div className="row">
//                     <div className="col-12 my-3" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
//                     <h1 style={{textAlign:'center'}} className='montserrat-400'>Products</h1>
//                     <select className='montserrat-400' name=""  onChange={(e)=> setSeacrh(e.target.value)}>
//                         <option value="">select by categories</option>
//                         {getCategories.map((items, index)=>(
//                             <option  key={index} value={items._id}>{items.categories}</option>
//                         ))}
                        
//                     </select>
                    
//                     </div>
//                     {dishes.map((item, index) => (
//                         <div key={index} className="col-12 col-lg-3">
                            
//                                 <div style={{ height: '50%', width: '100%' }}>
//                                     <img className="dishimg" src={`${backendUrl}/images/${item.image}`} onClick={() => handleClick(item)}  style={{ cursor: 'pointer' }} alt="" />
//                                 </div>
//                                 <div>
//                                     <h6 style={{color:'brown'}} >{item.dishes}</h6>
//                                     <h5  style={{color:'brown'}}><b>Rs {item.price}</b></h5>
//                                 </div>
//                                 {/* <div>
//                                     <h6>{item.description}</h6>

//                                 </div> */}
//                                 <button className='button' style={{textDecoration:'none',border:'none'}} onClick={() => redirectToWhatsApp(item)}>Buy now</button>{' '}
                            
//                         </div>
//                     ))}
//                 </div>
//         </div>
//         {/* <Footer/> */}
//     </div>
    
    
//   )
// }

// export default Products