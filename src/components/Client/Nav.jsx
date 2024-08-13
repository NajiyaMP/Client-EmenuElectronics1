

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Badge, NavDropdown,Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const NavbarComponent = ({ cartCount }) => {
  const [cart, setCart] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
  const [searchQuery, setSearchQuery] = useState('');
  const [uid, setUid] = useState("");
  const [show, setShow] = useState(false);
  const [settings, setSettings] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState('');
  const [allDishes, setAllDishes] = useState([]);


  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/getcart`);
      setCart(Array.isArray(response.data.cartItems) ? response.data.cartItems : []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartCount]);


  const filteredCart = cart.filter(item =>
    item.dishes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleViewCartClick = () => {
    navigate('/view-cart');
  };

  const handleClose = () => {
    setShow(false);
    setUid("");
  };


  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/getsettings`);
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, [backendUrl]);



// search
const handleSearchInputChange = (e) => {
  const searchTerm = e.target.value.toLowerCase();
  setSearchQuery(searchTerm);
  
  // Optionally debounce this call to avoid too many requests
  fetchDishes(searchTerm);
};

const fetchDishes = async (searchTerm) => {
  try {
    const response = await axios.get(`${backendUrl}/admin/getdishes`, {
      params: { search: searchTerm }
    });
    setDishes(response.data);
  } catch (error) {
    console.error('Error fetching dishes:', error);
  }
};



const handleSubmit = (e) => {
  e.preventDefault();
  navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
};

  return (
    <Navbar  expand="lg" className="custom-navbar" style={{ backgroundColor: "#fff" }}>
      <div className="container">
        <Navbar.Brand href="/" className="custom-navbar-brand">
          {settings.map((setting) => (
            <div key={setting._id}>
              {setting.image && (
                <img
                  src={`${backendUrl}/images/${setting.image}`}
                  alt="Company Logo"
                  className="logo-imgg"
                />
              )}
            </div>
          ))}
        </Navbar.Brand>
        <Form className="d-flex custom-search-form mx-auto" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Search what you looking for?"
              className="mr-sm-2"
              style={{ padding: "14px", borderRadius: "2rem" }}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button type="submit" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </button>
        </Form>
       
        <div className="d-flex align-items-center">
          <Link to="/compare" className="nav-icon">
            <i className="bi bi-arrow-left-right"></i>
          </Link>
          <Link to="/wishlist" className="nav-icon">
            <i className="bi bi-heart"></i>
          </Link>
          <div style={{ position: 'relative',marginLeft:"auto" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-cart4"
              viewBox="0 0 16 16"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2H8zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
            {cartCount > 0 && (
              <Badge pill bg='orange'  style={{ position: 'absolute', top: '-10px', right: '-10px' ,backgroundColor:'orange'}}>
                {cartCount}
              </Badge>
            )}
            {dropdownOpen && (
              <NavDropdown 
              title="" 
              id="basic-nav-dropdown" 
              show={dropdownOpen} 
              style={{left:'-14rem'}}
              onToggle={(isOpen) => setDropdownOpen(isOpen)} // optional: ensure dropdown can toggle
            >
              {cart.length > 0 ? (
                cart.map((item) => (
                  <NavDropdown.Item key={item._id} onClick={toggleDropdown}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img
                        src={`${backendUrl}/images/${item.image[0]}`}
                        alt={item.dishes}
                        className="cart-item-image"
                        style={{ width: "40px", height: "40px", borderRadius: "4px" }}
                      />
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#333' }}>{item.dishes}</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>1 x Rs{item.price}</div>
                      </div>
                    </div>
                    {/* <button style={{
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      fontSize: '1.2rem',
                      cursor: 'pointer'
                    }}>×</button> */}
                  </div>
                </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item>No items in cart</NavDropdown.Item>
              )}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button 
                  className='btn-add-cart' 
                  style={{width:"10rem"}} 
                  onClick={() => {
                    setDropdownOpen(false); // Close the dropdown
                    handleViewCartClick(); // Redirect to the View Cart page
                  }}
                >
                  View More
                </button>
              </div>
            </NavDropdown>
              // <NavDropdown title="" id="basic-nav-dropdown" show={dropdownOpen} style={{left:'-14rem'}}>
              //   {cart.length > 0 ? (
              //     cart.map((item) => (
              //       <NavDropdown.Item key={item._id} onClick={toggleDropdown}>
              //         <img
              //           src={`${backendUrl}/images/${item.image[0]}`}
              //           alt={item.dishes}
              //           className="cart-item-image"
              //           style={{ width: "50px", height: "50px", borderRadius: "var(--bs-border-radius-pill) !important" }}
              //         />
              //         {item.dishes}-Rs{item.price}
              //       </NavDropdown.Item>
              //     ))
              //   ) : (
              //     <NavDropdown.Item>No items in cart</NavDropdown.Item>
              //   )}
              //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              //     <button className='btn-add-cart'  style={{width:"10rem"}} onClick={handleViewCartClick} >View More</button>
              //   </div>
              // </NavDropdown>
            )}
          </div>
        </div>
        
      </div>
    </Navbar>
  );
};

export default NavbarComponent;




