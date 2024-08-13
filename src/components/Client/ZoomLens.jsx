import React, { useState } from 'react';

const ZoomLens = ({ imgSrc }) => {
  const [lensStyle, setLensStyle] = useState({});

  const moveLens = (e) => {
    const lens = document.getElementById('lens');
    const img = document.getElementById('featured');
    const ratio = 3;
    const bounds = img.getBoundingClientRect();
    let x = e.pageX - bounds.left - window.pageXOffset;
    let y = e.pageY - bounds.top - window.pageYOffset;
    x = Math.max(0, Math.min(x, img.width - lens.offsetWidth / ratio));
    y = Math.max(0, Math.min(y, img.height - lens.offsetHeight / ratio));
    setLensStyle({
      left: x + 'px',
      top: y + 'px',
      backgroundPosition: `-${x * ratio}px -${y * ratio}px`,
    });
  }

  return (
    <div id="img-container" onMouseMove={moveLens}>
      <div id="lens" style={{ backgroundImage: `url(${imgSrc})`, ...lensStyle }}></div>
      <img id="featured" src={imgSrc} alt="Featured" />
    </div>
  );
}

export default ZoomLens;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Row, Col } from 'react-bootstrap';
// import banr from './images/banner/file.png';

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
//             }
//         };
//         fetchSettings();
//     }, [backendUrl]);

//     const getEmbeddableMapLink = (mapLink) => {
//         if (mapLink.includes('maps.app.goo.gl')) {
//             const mapId = mapLink.split('/').pop();
//             return `https://www.google.com/maps/embed?pb=${mapId}`;
//         }

//         if (mapLink.includes('google.com/maps')) {
//             return mapLink.replace('/maps', '/maps/embed');
//         }

//         return mapLink;
//     };

//     return (
//         <div style={{ backgroundColor: "#2d2d2d" }}>
//             <div className='footer'>
//                 <Row className="justify-content-around pt-4">
//                     {settings.map((setting) => {
//                         const embeddableMapLink = getEmbeddableMapLink(setting.mapLink);
//                         return (
//                             <Col key={setting._id} md={3} className="mb-4 text-center">
//                                 <div className='d-flex flex-column align-items-center'>
//                                     {setting.image && (
//                                         <img
//                                             style={{ width: '5rem', height: '5rem' }}
//                                             src={`${backendUrl}/images/${setting.image}`}
//                                             alt="Company Logo"
//                                         />
//                                     )}
//                                     <h3>{setting.companyName}</h3>
//                                     <h6 style={{ color: 'inherit' }}>{setting.address}</h6>
//                                     <h6>
//                                         <a href={setting.mapLink} target="_blank" rel="noopener noreferrer">
//                                             Dubai
//                                         </a>
//                                     </h6>
//                                     <h6>
//                                         <a href={`tel:+${setting.contact}`}>
//                                             {setting.contact}
//                                         </a>
//                                     </h6>
//                                 </div>
//                             </Col>
//                         );
//                     })}
//                 </Row>
//                 <Row className="justify-content-around pt-4">
//                     <Col md={2} className="link-section">
//                         <h3>JEWELLERY</h3>
//                         <ul>
//                             <li>
//                                 <Link to={'/'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Bangles</Link>
//                             </li>
//                             <li>
//                                 <Link to={'/'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Pendents</Link>
//                             </li>
//                             <li>
//                                 <Link to={'/'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Necklaces</Link>
//                             </li>
//                         </ul>
//                     </Col>
//                     <Col md={2} className="link-section">
//                         <h3>DIAMOND</h3>
//                         <ul>
//                             <li>
//                                 <Link to={'/'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Necklaces</Link>
//                             </li>
//                             <li>
//                                 <Link to={'/aboutus'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Rings</Link>
//                             </li>
//                             <li>
//                                 <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Earings</Link>
//                             </li>
//                         </ul>
//                     </Col>
//                     <Col md={2} className="link-section">
//                         <h5>Other Categories</h5>
//                         <ul>
//                             <li>
//                                 <Link to={'/'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Gold</Link>
//                             </li>
//                             <li>
//                                 <Link to={'/aboutus'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>18kt</Link>
//                             </li>
//                             <li>
//                                 <Link to={'/collections'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>22kt</Link>
//                             </li>
//                         </ul>
//                     </Col>
//                     <Col md={2} className="link-section">
//                         <h3>DOWNLOAD APP</h3>
//                         <div>
//                             <img src={banr} alt="img" />
//                         </div>
//                         <ul className='d-flex gap-3'>
//                             <li>
//                                 <Link to={'/aboutus'}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
//                                         <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path>
//                                     </svg>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to={'/collections'}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
//                                         <path d="M11 1H5a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h3v-6H8V8h2V6a2 2 0 0 1 2-2h1V1zM5 0a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5H5z"></path>
//                                     </svg>
//                                 </Link>
//                             </li>
//                         </ul>
//                     </Col>
//                 </Row>
//                 <Row className="justify-content-center pt-4 pb-4">
//                     <Col md={8} className="text-center">
//                         <div>
//                             <p className="copy-text">© 2024 All Rights Reserved. Your Company Name</p>
//                         </div>
//                     </Col>
//                 </Row>
//             </div>
//         </div>
//     );
// }

// export default Footer;
