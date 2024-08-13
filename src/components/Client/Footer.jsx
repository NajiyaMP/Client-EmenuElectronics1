// // orginal
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Logs from './images/logo/bgg.png';

// function Footer() {
//   return (
//     <div className="footer">
      
//       <div className="container-fluid" style={{ backgroundColor: '#2d2d2d' }}>
//         <div style={{padding:'10px'}}>
//           <div className="row text-white">
//             <div className="col-12 col-lg-4 ">
//               <img className="footer-logo" src={Logs} alt="Logo" />
//             </div>
//             <div className="col-12 col-lg-4 mt-5">
//                 <p className="d-flex gap-2">
//                     <div>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-signpost-2" viewBox="0 0 16 16">
//                             <path d="M7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.725 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.3 2.4a1 1 0 0 0-.8-.4H9v-.586a1 1 0 0 0-2 0M13.5 3l.75 1-.75 1H2V3zm.5 5v2H2.5l-.75-1 .75-1z"/>
//                         </svg>
//                     </div>
//                     <div>
//                     GOLD SOUK
//                     </div>
//                 </p>
//                 <p className="footer-contact ">

//                     <a href="tel:+971585023411" className="footer-link d-flex gap-2">
//                         <div>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
//                                 <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
//                             </svg> 
//                         </div>
                    
//                         <div>+971 58 502 3411</div>
//                     </a>
//                 </p>
//                 <p className="footer-email">
//                     <a href="mailto:Ajmal@naherit.com" className="footer-link d-flex gap-2">
//                         <div>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
//                                 <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
//                             </svg>
//                         </div>
//                         <div>
//                             Ajmal@naherit.com
//                         </div>
//                     </a>
//                 </p>
//                 <p className="footer-loc">
//                     <a href="https://maps.app.goo.gl/yRcq9trKRka1W3Y79" className="footer-link  d-flex gap-2">
//                     <div>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
//                             <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
//                             <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
//                         </svg>
//                     </div>
//                     <div>
//                         Location

//                     </div>
                    
//                     </a>
//                 </p>
//             </div>
           
//             {/* <div className="col-12 col-lg-3 mt-5">
//               <iframe 
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.016704595287!2d55.29813610000001!3d25.270023499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43438edb60cd%3A0xbc047ee4e16b356d!2sDubai%20Gold%20Souk!5e0!3m2!1sen!2sin!4v1719896805068!5m2!1sen!2sin" 
//                 width="100%" 
//                 height="200" 
//                 allowFullScreen="" 
//                 loading="lazy" 
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Google Map Location"
//                 className="footer-map">
//               </iframe>          
//             </div> */}
//             <div className="col-12 col-lg-4 mt-5">
//               <h4 className="footer-navigation-title">GO TO</h4>
//               <ul className="list-unstyled footer-navigation">
//                 <li>
//                   <Link to="/" className="footer-nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
//                 </li>
//                 <li>
//                   <Link to="/aboutus" className="footer-nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About Us</Link>
//                 </li>
//                 <li>
//                   <Link to="/collections" className="footer-nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Collections</Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import banr from './images/banner/file.png';
// import logo from './images/logo/logo.png';


function Footer() {
    const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
    const [settings, setSettings] = useState([]);

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

    const getEmbeddableMapLink = (mapLink) => {
        if (mapLink.includes('maps.app.goo.gl')) {
            const mapId = mapLink.split('/').pop();
            return `https://www.google.com/maps/embed?pb=${mapId}`;
        }

        if (mapLink.includes('google.com/maps')) {
            return mapLink.replace('/maps', '/maps/embed');
        }

        return mapLink;
    };

    return (
        <div style={{backgroundColor: '#2d2d2d',borderTop:'1px solid inherit grey'}}>
            <div className='footer'>
                <div>
                    <Row>
                        <Col md={3}>
                            {settings.map((setting) => {
                                const embeddableMapLink = getEmbeddableMapLink(setting.mapLink);

                                return (
                                    <div key={setting._id} className="mb-4" style={{paddingLeft:'2.5rem'}}> 
                                       
                                        <div>
                                            <div>

                                                {setting.image.map((image, idx) => (
                                                    <img key={idx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${idx + 1}`} />
                                                ))}

                                                {/* {setting.image && (
                                                    <img
                                                    
                                                        src={`${backendUrl}/images/${setting.image}`}
                                                        alt="Company Logo"
                                                         className="logo-imgg"
                                                    />
                                                )} */}
                                                {/* <img src={logo} alt="Logo" className="logo-imgg" /> */}

                                            </div>
                                            <div className='mt-4'>
                                                <h5 style={{paddingLeft:'2.5rem'}}>{setting.companyName}</h5>
                                                <h6 style={{color: "#6c6c6c",paddingLeft:'2rem'}}>{setting.address}</h6>
                                                <h6 style={{paddingLeft:'2rem'}}>
                                                    <a href={setting.mapLink} target="_blank" rel="noopener noreferrer">
                                                        Dubai
                                                    </a>
                                                </h6>
                                                <h6 style={{paddingLeft:'2rem'}}>
                                                    <a href={`tel:+${setting.contact}`}>
                                                        {setting.contact}
                                                    </a>
                                                </h6>
                                            </div>
                                            
                                        </div>
                                    </div>
                                );
                            })}
                        </Col>
                        <Col md={2} className="link-section">
                            <h6>NEW ARRIVALS</h6>
                            <ul>
                                <li>
                                    <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Apple</Link>
                                </li>
                                <li>
                                    <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Oppo</Link>
                                </li>
                                <li>
                                    <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Samsung</Link>
                                </li>
                            </ul>
                        </Col>   
                        <Col md={2} className="link-section">
                            <h6>LATEST GADGETS</h6>
                            <ul>
                                <li>
                                    <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Redmi</Link>
                                </li>
                                <li>
                                    <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Apple</Link>
                                </li>
                                <li>
                                    <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Samsung</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col md={2} className="link-section">
                            <h6>OTHER</h6>
                            <ul style={{textAlign:'center'}}>
                                <li>
                                    <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Speakers</Link>
                                </li>
                                <li>
                                    <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Headset</Link>
                                </li>
                                <li>
                                    <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Accessories</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col md={3} className="link-section">
                            <h6>DOWNLOAD APP</h6>
                            <div style={{margin:'2rem'}}>
                                    <img src={banr} style={{height:'2.5rem'}} alt="img"/>
                            </div>
                            <ul className='d-flex gap-3'>
                                <li>
                                    <Link to={'/'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                        </svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                    </svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"/>
                                    </svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                                        </svg>
                                    </Link>
                                </li>
                                
                            </ul>
                        </Col>
                        {/* <Col md={3} className="link-section">
                            <h3>DOWNLOAD APP</h3>
                            <ul>
                                <li>
                                    <Link to={'/'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><b>Home</b></Link>
                                </li>
                                <li>
                                    <Link to={'/aboutus'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><b>About us</b></Link>
                                </li>
                                <li>
                                    <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><b>Collections</b></Link>
                                </li>
                            </ul>
                        </Col> */}
                    </Row>
                </div>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'2.5rem',borderTop:"1px solid grey",padding:'10px 0px'}}>
                <h6 style={{color:'grey'}}>Copyright@2024<span style={{color:'#a8741a'}}>ELECTRONICSSTORE</span></h6>
                <div className='d-flex gap-1'>
                    <h6 style={{color:'grey'}}>ALL Right Reserved</h6>
                    <h6 style={{color:'grey'}}>|</h6>
                    <h6 style={{color:'grey'}}>Tecnaviswebsolution Pvt.Ltd</h6>
                </div>        
            </div>
        </div>
       
    );
}

export default Footer;






//fetching from backend
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Logs from './images/logo/bgg.png';
// import { Link } from 'react-router-dom';
// import { Row, Col } from 'react-bootstrap';

// function Footer() {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

//     const [settings, setSettings] = useState([]);

//     useEffect(() => {
//         const fetchSettings = async () => {
//             try {
//                 const response = await axios.get(`${backendUrl}/admin/getsettings`);
//                 setSettings(response.data);
//             } catch (error) {
//                 console.error('Error fetching settings:', error);
//                 // Handle error state or display a message
//             }
//         };
//         fetchSettings();
//     }, [backendUrl]);

//     const getEmbeddableMapLink = (mapLink) => {
//         // Transform the URL if it's a typical Google Maps short link
//         if (mapLink.includes('maps.app.goo.gl')) {
//             // Typically, you should get the full redirect URL, but here we'll assume a simplified approach
//             const mapId = mapLink.split('/').pop();
//             return `https://www.google.com/maps/embed?pb=${mapId}`;
//         }

//         // For other Google Maps URLs
//         if (mapLink.includes('google.com/maps')) {
//             return mapLink.replace('/maps', '/maps/embed');
//         }

//         return mapLink; // Default to provided link
//     };

//     return (
//         <div>
//             <div style={{ backgroundColor: '#2d2d2d' }}>
//                 <div className='container p-5'>
//                     <Row>
//                         <Col md={8}>
//                             {settings.map((setting) => {
//                                 const embeddableMapLink = getEmbeddableMapLink(setting.mapLink);
//                                 return (
//                                     <Row key={setting._id}>
//                                         <Col md={4}>
//                                             <img className='footer-logo' src={Logs} alt="Company Logo" />
//                                         </Col>
//                                         <Col md={4}>
//                                             <h6 style={{ color: '#cba73b' }}>{setting.companyName}</h6>
//                                             <h6 style={{ color: '#cba73b' }}>{setting.address}</h6>
//                                             <h6 style={{ color: '#cba73b' }}>
//                                                 <a href={`tel:+${setting.contact}`} style={{ color: 'inherit', textDecoration: 'none' }}>
//                                                     {setting.contact}
//                                                 </a>
//                                             </h6>
//                                         </Col>
//                                         <Col md={4}>
//                                             <iframe
//                                                 src={embeddableMapLink}
//                                                 width="80%"
//                                                 height="80%"
//                                                 style={{ border: 0 }}
//                                                 allowFullScreen=""
//                                                 loading="lazy"
//                                                 referrerPolicy="no-referrer-when-downgrade"
//                                             ></iframe>
//                                         </Col>
//                                     </Row>
//                                 );
//                             })}
//                         </Col>

//                         <Col md={4} className="text-light montserrat-400" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
//                             <div>
//                                 <h4 style={{ color: 'black' }}>GO TO</h4>
//                                 <ul style={{ listStyle: 'none' }}>
//                                     <li style={{ color: '#cba73b' }}>
//                                         <Link style={{ textDecoration: 'none' }} to={'/'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><b>Home</b></Link>
//                                     </li>
//                                     <li style={{ color: '#cba73b' }}>
//                                         <Link style={{ textDecoration: 'none' }} to={'/aboutus'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><b>About us</b></Link>
//                                     </li>
//                                     <li style={{ color: '#cba73b' }}>
//                                         <Link style={{ textDecoration: 'none' }} to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><b>Collections</b></Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </Col>
//                     </Row>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Footer;


