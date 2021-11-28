import React from 'react';
import { Toast } from 'react-bootstrap';

const CustomToast = ({ message, toastClassName, headerClassName}) => {

    const toastCss = {
        position: 'fixed',
        top: '20px',
        right: '20px'
    }

    return (
        <div style={toastCss}>
            <Toast className={toastClassName}>
                <Toast.Header className={headerClassName} closeButton={false}>
                    {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                    <strong className="mr-auto">Success</strong>
                    {/* <small>11 mins ago</small> */}
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </div>
    )
}

export default CustomToast
