import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import blog from './images/banner/banner2222.jpg';
import { Row, Col, Container } from 'react-bootstrap';


function Aboutus() {
  return (
    <div id="about" className='bg-light'>
        <div className="container-fluid banner-2">
            <div className="row">
                {/* <div className="col-3">
                    <h className='text-light my-4 montserrat-600' style={{textAlign:'center'}}>ABOUT-US</h4>
                </div> */}
            </div>
        </div>
            <div className="container-fluid banner-4 bg-light">
                <Container>
                    <Row className="py-5">
                        <Col lg={5} xs={12}>
                            <img style={{ width: '100%', height: 'auto' }} src={blog} alt="About Us" />
                        </Col>
                        <Col lg={7} xs={12}>
                            <h1 className='montserrat-400'>About Us</h1>
                            <p style={{color:'black'}}>
                                These are several different means to adorn a certain body part. Earrings are meant to adorn the ears, for instance, and necklaces are meant to adorn the neck. Some other types of jewellery include bracelets, anklets, rings, brooches, pins, and body jewellery. Jewellery design is the art of the designing and creating of jewellery. This is one of civilization’s earliest forms of decoration, dating back at least seven thousand years to the oldest known human societies in Mesopotamia and Egypt. The art has taken many forms throughout the centuries, from the simple beadwork of ancient times to the sophisticated metal working and gem cutting known in modern day. Courses will impart knowledge about different types of stones, design themes, presentations, jewellery costing and jewellery making. Some of the courses use computer-aided programs for designing jewellery and accessories. Enjoy the convenience to buy gold online in Kerala! Our collection features a wide range of beautiful and high-quality pieces that are sure to suit your style and budget. Whether you’re looking for a special piece of diamond jewellery for a special occasion or simply want to add to your collection, we have something for everyone. Experience the best in diamond jewellery and gold shopping with SAFA Jewellery. Shop now!
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        <Footer/>
    </div>
  )
}

export default Aboutus