// TryItOnModal.js
import React, { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Webcam from 'react-webcam';

function TryItOnModal({ show, handleClose, product }) {
    const [isWebcamActive, setWebcamActive] = useState(false);
    const webcamRef = useRef(null);
    const [productImage, setProductImage] = useState(null);

    const startWebcam = () => {
        setWebcamActive(true);
        setProductImage(`${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/images/${product.image[0]}`);
    };

    const videoConstraints = {
        width: 720,
        height: 720,
        facingMode: 'user',
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Try It On</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {isWebcamActive ? (
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={720}
                                videoConstraints={videoConstraints}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {productImage && (
                                <img
                                    src={productImage}
                                    alt="Product"
                                    style={{
                                        position: 'absolute',
                                        width: '100px',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        <Button variant="primary" onClick={startWebcam}>Activate Webcam</Button>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TryItOnModal;

