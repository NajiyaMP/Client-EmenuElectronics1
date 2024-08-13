import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import Preloader from './Preloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import home1 from './images/banner/home-01.jpg';
import home2 from './images/banner/home-05.jpg';
import home3 from './images/banner/home-11.jpg';
import { Row,Col} from 'react-bootstrap';
import { Link} from 'react-router-dom';





const CategoriesMenu = () => {
    const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
    const [mainCategories, setMainCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMainCategories = async () => {
            try {
                const response = await axios.get(`${backendUrl}/admin/getmaincategories`);
                setMainCategories(response.data);
            } catch (err) {
                console.error('Error fetching main categories:', err);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${backendUrl}/admin/getcategories`);
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        const fetchSubCategories = async () => {
            try {
                const response = await axios.get(`${backendUrl}/admin/getsubcategories`);
                setSubCategories(response.data);
            } catch (err) {
                console.error('Error fetching subcategories:', err);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchMainCategories(), fetchCategories(), fetchSubCategories()]);
            setLoading(false);
        };

        fetchData();
    }, [backendUrl]);

    const categoriesMap = mainCategories.map(mainCat => {
        return {
            ...mainCat,
            categories: categories.filter(cat => cat.maincategoriesData._id === mainCat._id).map(cat => {
                return {
                    ...cat,
                    subcategories: subCategories.filter(subCat => subCat.category && subCat.category._id === cat._id)
                };
            })
        };
    });

    return (
        <Navbar expand="lg" className="custom-navbar" style={{ backgroundColor: "#fff" }}>
            <div className="container gap-4">
                <div id="mega-menu">
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
                            <Preloader />
                        </div>
                    ) : (
                    <>
                        <div className="btn-mega">
                            <span></span>
                            ALL CATEGORIES
                        </div>
                        <ul className="menu" >
                            {categoriesMap.map(mainCat => (
                                <li key={mainCat._id} style={{padding: "20px",textTransform: "capitalize"}}>
                                    <Link to="#" className="dropdown d-flex gap-3" style={{textDecoration:'none',color:'grey'}}>
                                        <span className="menu-img">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                                        </svg>
                                        </span>
                                        <span>{mainCat.maincategories}</span>
                                    </Link>
                                    <div className="drop-menu">
                                        {mainCat.categories.map(cat => (
                                            <div className="one-third" key={cat._id}>
                                                <h3 className="cat-title">
                                                    <Link to={`/dishes?category=${cat._id}`}  style={{textDecoration:'none',color:'#f28b00',textTransform: "capitalize"}}>
                                                        {cat.name}
                                                    </Link>
                                                </h3>
                                                <ul style={{paddingLeft:'0rem'}}>
                                                    {cat.subcategories.map(subCat => (
                                                        <li key={subCat._id}>
                                                            <Link to={`/dishes?subcategory=${subCat._id}`} className={subCat._id === categories[0]._id ? 'show' : ''} style={{textDecoration:'none',color:'grey',textTransform: "capitalize"}}>
                                                                {subCat.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>
                                        ))}
                                        <div>
                                            <Row>
                                                <Col md={4}>
                                                    <img src={home1}  />
                                                </Col>
                                                <Col md={4}> 
                                                    <img src={home2} />                                      
                                                </Col>
                                                <Col md={4}>
                                                    <img src={home3} />
                                                </Col>


                                            </Row>

                                        </div>
                                    

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                    )}
                </div>
                <Nav style={{display:'flex',gap:'1.5rem'}}>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/products">Shop</Nav.Link>
                    <Nav.Link as={Link} to="/features">Features</Nav.Link>
                    <Nav.Link as={Link} to="/electronic">Electronic</Nav.Link>
                    <Nav.Link as={Link} to="/pages">Pages</Nav.Link>
                    <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                </Nav>
           
            </div>
           

        </Navbar>
      
    );
};

export default CategoriesMenu;


