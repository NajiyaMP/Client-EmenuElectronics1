import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Preloader from './Preloader'; // Import the Preloader component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'slick-carousel/slick/slick.css'; // Import Slick CSS
import 'slick-carousel/slick/slick-theme.css'; // Import Slick theme CSS
import { useNavigate } from 'react-router-dom';

const Newarrivals = () => {
    const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingImages, setLoadingImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                const response = await axios.get(`${backendUrl}/admin/getdishes?newArrivals=true`);
                const data = response.data;

                // Sort data in descending order
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setLatestProducts(sortedData);
                setLoadingImages(Array(data.length).fill(true));
                console.log('Fetched latest products:', sortedData);
            } catch (err) {
                console.error('Error fetching latest products:', err);
            }
        };

        const fetchData = async () => {
            await fetchLatestProducts();
            setLoading(false);
        };

        fetchData();
    }, [backendUrl]);

    // Slick carousel settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 2500, // Set autoplay speed (2.5 seconds)
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
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
            newLoadingState[index] = false; // Remove preloader on error as well
            return newLoadingState;
        });
    };

    const handleClick = (item) => {
        navigate('/view-details', { state: { item } });
    };

    return (
        <div className="main_menu mt-5">
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
                    {/* Loading indicator can be placed here if needed */}
                </div>
            ) : (
                <div className="mt-5 latest-products">
                    <h2 style={{ color: '#f28b00' }}><b>New Arrivals</b></h2>
                    <Slider {...settings}>
                        {latestProducts.map((product, index) => (
                            <div key={product._id} className="product-item">
                                <div style={{ position: 'relative', marginLeft: '1rem' }}>
                                    {loadingImages[index] && <Preloader />}
                                    <img
                                        className="d-block w-100" // Ensure the image takes full width
                                        src={`${backendUrl}/images/${product.image[0]}`}
                                        alt={product.dishes}
                                        onClick={() => handleClick(product)}
                                        onLoad={() => handleImageLoad(index)}
                                        onError={() => handleImageError(index)}
                                        style={{ 
                                            display: loadingImages[index] ? 'none' : 'block', 
                                            cursor: 'pointer', 
                                            objectFit: 'cover',
                                            height: '254px' // Set a fixed height for uniformity
                                        }}
                                    />
                                </div>
                                <div className="text-center mt-4" style={{textTransform:'capitalize'}}> {/* Center-align text below the image */}
                                    <h6 style={{ color: 'black' }}>{product.dishes}</h6>
                                    <h6 style={{ color: 'black' }}>Rs {product.price}</h6>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default Newarrivals;

