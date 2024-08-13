import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import Maincategory from './Maincategory';
import Newarrivals from './Newarrivals';
import Products from './Products';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import home1 from './images/banner/home-01.jpg';
import home2 from './images/banner/home-05.jpg';
import home3 from './images/banner/home-11.jpg';
import { Row, Col } from 'react-bootstrap';

const BannerCarousel = () => {
    const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`${backendUrl}/admin/getbanner`);
                setBanners(response.data);
                console.log(response.data, 'Fetched banners');
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, [backendUrl]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
    };

    return (
        <div>
            <Maincategory />
            <div className="banner-carousel">
                <Slider {...settings}>
                    {banners.map((banner, index) => (
                        <div key={index}>
                            <Row className='mt-5'>
                                <Col md={6}>
                                    <div className="caption">
                                        <h3>Get flat 10% Cashback</h3>
                                        <h2>THE BIG SALE</h2>
                                        <button className="shop-now-btn">
                                            <Link to={'/collections'} style={{color:'white', textDecoration:'none'}}>
                                                Shop Now
                                            </Link>
                                        </button>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="banner-slide">
                                        {banner.image && banner.image.length > 0 && (
                                            <img
                                                src={`${backendUrl}/images/${banner.image[0]}`}
                                                alt={`Banner ${index}`}
                                                className="img-fluid"
                                            />
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Rest of your component code... */}

            <section className="flat-row flat-banner-box mt-5 p-5">
                <div class="container">
			        <div class="row">
 					    <div class="col-md-4">
 						    <div class="banner-box">
 							    <div class="inner-box">
 								    <a className='imgg' href="#" title="">
                                        <img src={home1} alt=""/>
 								    </a>
							    </div>
 						    </div>
 					    </div> 					
                        <div class="col-md-4">
 						    <div class="banner-box"> 				
                            	<div class="inner-box">
                                    <a href="#" title="">
                                        <img src={home2} alt=""/>
                                    </a>
							    </div> 					
                            </div> 
                        </div>
                        <div class="col-md-4">
                            <div class="banner-box">
                                <div class="inner-box">
                                    <a href="#" title="">
                                        <img src={home3} alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>
				</div>
			    </div>
            </section>

            <div>
                <Newarrivals />
            </div>
            <div>
                <Products />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default BannerCarousel;


// import React, { useState, useEffect } from 'react';
// import Slider from 'react-slick';
// import axios from 'axios';
// import Maincategory from './Maincategory';
// import Newarrivals from './Newarrivals';
// import Products from './Products';
// import Footer from './Footer';
// import { Link} from 'react-router-dom';
// import  home1  from './images/banner/home-01.jpg';
// import  home2  from './images/banner/home-05.jpg';
// import  home3  from './images/banner/home-11.jpg';






// const BannerCarousel = () => {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [banners, setBanners] = useState([]);

//     useEffect(() => {
//         const fetchBanners = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getbanner`);
//                 setBanners(response.data); // Set the fetched banners directly
//                 console.log(response.data, 'Fetched banners'); // Log the fetched data
//             } catch (error) {
//                 console.error('Error fetching banners:', error);
//             }
//         };

//         fetchBanners();
//     }, [backendUrl]);

//     // Slick settings
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500, // Adjust speed for smooth transitions
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true, // Enable auto play
//         autoplaySpeed: 2500, // Duration for which each slide is displayed (in milliseconds)
//         pauseOnHover: true, // Pause on hover

//     };

//     return (
//         <div>
//             <Maincategory/>
//             <div className="banner-carousel">
//                 <Slider {...settings}>
//                     {banners.map((banner, index) => (
//                     <div key={index} className="banner-slide">
//                         {banner.image.length > 0 && (
//                         <img
//                             src={`${backendUrl}/images/${banner.image[0]}`}
//                             alt={`Banner ${index}`}
//                             className="img-fluid"
//                         />
//                         )}
                        
//                         <div className="caption">
//                         <h3>Get flat 10% Cashback</h3>
//                         <h2>THE BIG SALE</h2>

//                         <button className="shop-now-btn">
//                             <Link to={'/products'} style={{color:'white',textDecoration:'none'}}>Shop Now</Link>
//                         </button>
//                         </div>
//                     </div>
//                     ))}
//                 </Slider>
//             </div>
//             {/* <div className="banner-carousel">
//                 <Slider {...settings}>
//                     {banners.map((banner, index) => (
//                         <div key={index} className="banner-slide">
//                             {banner.image.length > 0 && (
//                                 <img
//                                     src={`${backendUrl}/images/${banner.image[0]}`} 
//                                     // Display the first image of each banner
//                                     // src={`${backendUrl}/images/${banner.image[0].image}`}
//                                     alt={`Banner ${index}`}
//                                     className="img-fluid"
//                                 />
//                             )}
//                             <div className="caption">
//                                 <h3>Get flat 10% Cashback</h3>
//                                 <p>Today Discount<span>SHOP NOW</span></p>
                                
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>
//             </div> */}
//             <section class="flat-row flat-banner-box mt-5 p-5">
// 			<div class="container">
// 				<div class="row">
// 					<div class="col-md-4">
// 						<div class="banner-box">
// 							<div class="inner-box">
// 								<a href="#" title="">
//                                     <img src={home1} alt=""/>
// 								</a>
// 							</div>
// 						</div>
// 					</div>
// 					<div class="col-md-4">
// 						<div class="banner-box">
// 							<div class="inner-box">
// 								<a href="#" title="">
//                                     <img src={home2} alt=""/>
// 								</a>
// 							</div>
// 						</div>
// 					</div>
// 					<div class="col-md-4">
// 						<div class="banner-box">
// 							<div class="inner-box">
// 								<a href="#" title="">
// 									<img src={home3} alt=""/>
// 								</a>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		    </section>

//             <div>
//                 <Newarrivals />
//             </div>
//             <div>
//                 <Products />
//             </div>
//             <div>
//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default BannerCarousel;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import Maincategory from './Maincategory';
// import Newarrivals from './Newarrivals';
// import Products from './Products';
// import Footer from './Footer';
// // import crd from './images/icon/tt.png';
// // import crdd from './images/icon/ctry.png'

// import { Container, Row, Col } from 'react-bootstrap';

// const Home = () => {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

//     const [banners, setBanners] = useState([]);

//     useEffect(() => {
//         const fetchBanners = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getbanner`);
//                 setBanners(response.data); // Set the fetched banners directly
//                 console.log(response.data, 'Fetched banners'); // Log the fetched data
//             } catch (error) {
//                 console.error('Error fetching banners:', error);
//             }
//         };

//         fetchBanners();
//     }, [backendUrl]);

//     return (
//         <div>
//             <Maincategory />
//             <div>
//             <div className="banner-grid">
//                 <Row>
//                     {banners.map((banner, index) => (
//                         banner.image.map((img, imgIndex) => (
//                             <Col md={12} key={`${index}-${imgIndex}`}>
//                                 <img src={`${backendUrl}/images/${img}`} alt="Banner" className="img-fluid" />
//                             </Col>
//                         ))
//                     ))}
//                 </Row>
//             </div>
            
//                 <div>
//                     <Newarrivals />
//                 </div>
//                 <div>
//                     <Products />
//                 </div>

//                 <div>
//                     <Footer />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;
