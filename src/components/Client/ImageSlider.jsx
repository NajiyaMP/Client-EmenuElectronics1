



// ORGINAL
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Button, Carousel, Dropdown,Modal } from 'react-bootstrap';
import Maincategory from './Maincategory';
// import Navbar from './Nav';
import ReactImageMagnify from 'react-image-magnify';
import Footer from './Footer';
import { Link } from 'react-router-dom';


const ViewDetails = () => {
  const location = useLocation();
  const { item } = location.state || {}; // Destructure with fallback
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = React.useState(false);

 

  // Function to handle WhatsApp redirection
  const redirectToWhatsApp = (order) => {
    const phoneNumber = '+971585023411';
    const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${order.image[currentImageIndex]}`;
    const message = `Hi, I'd like to order  ${imageUrl} ${order.dishes} for Rs ${order.price}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Function to handle the zoom lens
  const handleMouseOver = () => {
    if (item.image.length > 1) {
      // Cycle through the images
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.image.length);
    }
  };

  const handleMouseOut = () => {
    // Reset to the first image
    setCurrentImageIndex(0);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };




  // Function to handle sharing via email
  const shareViaEmail = (item) => {
    const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${item.image[currentImageIndex]}`;

    const subject = `Check out this product: ${item.dishes}`;
    const body = `  ${imageUrl} Hi, I found this amazing product: ${item.dishes}. It costs Rs ${item.price}. Check it out at ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  // Function to handle sharing via WhatsApp
  const shareViaWhatsApp = (item) => {
    
    const imageUrl = `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${item.image[currentImageIndex]}`;
    const message = ` ${imageUrl} Check out this product: ${item.dishes}. It costs Rs ${item.price}. Check it out at ${window.location.href}. `;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  

  return (
    <div>
   
      <Maincategory />
      <div>
        <div className="p-5">

          <Row>
            <Col md={8} className="d-flex">
              
              <div style={{marginTop:'8rem'}}>
                {item && item.image && (
                  <Row>
                    <Col md={2}>
                    <div className="thumbnail-carousel d-flex flex-column justify-content-center align-items-center">
                      {item.image.map((thumbSrc, index) => (
                        <div
                          key={index}
                          className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                          style={{
                            cursor: 'pointer',
                            border: index === currentImageIndex ? '2px solid blue' : 'none',
                            padding: '5px',
                            marginBottom: '10px', // space between thumbnails
                          }}
                        >
                          <img
                            src={`${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${thumbSrc}`}
                            alt={`Thumbnail ${index + 1}`}
                            style={{  objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>

                    </Col>
                  
                    <Col md={10}>
                        
                      <div className="main-carousel">
                        <Carousel
                          activeIndex={currentImageIndex}
                          onSelect={(selectedIndex) => setCurrentImageIndex(selectedIndex)}
                          pause='hover'
                          className="item-carousel"
                        >
                          {item.image.map((imageSrc, index) => (
                            <Carousel.Item key={index}>
                              <Col md={6} className="d-flex align-items-center justify-content-center">
                                <div style={{ width: '342px', height: '513px' }}>
                                  <ReactImageMagnify
                                    {...{
                                      smallImage: {
                                        alt: `Image ${index + 1}`,
                                        isFluidWidth: true,
                                        src: `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${imageSrc}`,
                                      },
                                      largeImage: {
                                        src: `${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${imageSrc}`,
                                        width: 200,
                                        height: 300,
                                      },
                                    }}
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                    style={{
                                      cursor: 'pointer',
                                      transition: 'all 0.3s ease-in-out',
                                    }}
                                  />
                                </div>
                              </Col>
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      </div>
                    </Col> 

                  </Row>
                )}
              </div>

              <div className="share-button">
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-share">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-share-fill" viewBox="0 0 16 16">
                      <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => shareViaWhatsApp(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-whatsapp" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                      </svg>
                      WhatsApp
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => shareViaEmail(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                      </svg>
                      Email
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>


              
              
              
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-center">
              {item && (
                <div className="details text-center">
                  <h6>{item.Itemnumber}</h6>
                  <h2><b>{item.dishes}</b></h2>
                  <h6>{item.description}</h6>
                  <h4>Price: Rs {item.price}</h4>
                  <h6>Price Inclusive of all taxes</h6>
                  <h6 className="weight">Weight: {item.weight}gm</h6>
                  <h6>Purity: {item.purity}</h6>
                  <Button
                    onClick={() => redirectToWhatsApp(item)}
                    className="btn btn-primary"
                  >
                    Buy now
                  </Button>
                  <hr className="divider" />
                  <div className="features">
                    <div className="feature-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gem" viewBox="0 0 16 16">
                        <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6zm11.386 3.785-1.806-2.41-.776 2.413zm-3.633.004.961-2.989H4.186l.963 2.995zM5.47 5.495 8 13.366l2.532-7.876zm-1.371-.999-.78-2.422-1.818 2.425zM1.499 5.5l5.113 6.817-2.192-6.82zm7.889 6.817 5.123-6.83-2.928.002z"/>
                      </svg>
                      <h6>Purity guaranteed</h6>
                    </div>
                    <div className="feature-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 1 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>
                      </svg>
                      <h6>Exchange across all stores</h6>
                    </div>
                  </div>
                  <hr className="divider" />
                  <h5>Still Confused What to Buy?</h5>
                  <h6>Get on live chats with our design experts on WhatsApp, or visit your nearest store for a closer look and more details about the product.</h6>
                  <Button
                    onClick={() => redirectToWhatsApp(item)}
                    className="btn btn-secondary"
                  >
                    Talk to an Expert
                  </Button>
                  <hr className="divider" />
                  
                </div>
              )}
            </Col>
          </Row>
          <div className="product-details">
            <h2>Product Details</h2>
            <h6>The radiance of stars forms the inspiration for this enchanting bracelet. Exquisite and stunning, this is sure to be your go-to jewellery!</h6>
            <h4>Specification</h4>
            <h6>Brand: {item?.details || 'N/A'}</h6>
          </div>
        </div>
        <div>
          <Footer/>
        </div>
      </div>



      
    </div>

  );
};

export default ViewDetails;