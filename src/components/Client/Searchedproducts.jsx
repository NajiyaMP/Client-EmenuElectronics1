import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row,Col} from 'react-bootstrap';
import Preloader from './Preloader';
import swal from 'sweetalert';




const SearchResults = ({ updateCartCount }) => {
  const [dishes, setDishes] = useState([]);
  const location = useLocation();
  const [loadingImages, setLoadingImages] = useState([]);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/getdishes`, {
          params: { search: searchQuery }
        });
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

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

const handleClick = (item) => {
  navigate('/view-details', { state: { item } });
};


  return (
    <div className='mt-5 container'>
      <div className='container'>
        <h6 style={{color:'grey'}}>Search Results for "{searchQuery}"</h6>
      </div>
     
      <Row>
        {dishes.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
            <h5>No products found</h5>
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
      {/* Use your existing code to display dishes here */}
    </div>
  );
};

export default SearchResults;
