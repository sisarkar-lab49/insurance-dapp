
import { Button, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';
import './Contact.css';

import ContactImg from '../assets/Contact.png';
import PopupModal from '../popupmodal/PopupModal';

const Contact = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [showModal,setShowModal] = useState(false);

    const messageInfo = 'Thanks for contacting us. Our Experts team will contact you shorlty....'

    const openModal = () => {
        setShowModal(!showModal)
    }

    const handleOpenResponseModal = () => {
        setShowModal(false);
    }


    const ContactImage = (
        <div className='contact-image-container'>
            <img alt='contact' src={ContactImg}/>
        </div>
    )

    const ContactForm = (
        <div className='contact-form-container'>
            {showModal && <PopupModal header='Thanks' open={showModal} message={messageInfo} handleOpenResponseModal={handleOpenResponseModal}/>}
            <h1>Contact Us</h1>
            <div className='contact-text-container'>
                <span>Explore the future with us</span>
                <span>Feel free to contact us</span>
            </div>
            <div>
                <InputLabel>Name</InputLabel>
                <TextField style={{ width:'20rem',marginTop: '10px', marginBottom: '10px', backgroundColor: 'white', borderRadius: '10px' }} placeholder='Name' value={name} onChange={e => setName(e?.target?.value)}></TextField>
                <InputLabel>Email</InputLabel>
                <TextField style={{ width:'20rem', marginTop: '10px', marginBottom: '10px', backgroundColor: 'white', borderRadius: '10px' }} placeholder='Email' value={email} onChange={e => setEmail(e?.target?.value)}></TextField>
                <InputLabel>Message</InputLabel>
                <TextField style={{ width:'20rem', marginTop: '10px', marginBottom: '10px', backgroundColor: 'white', borderRadius: '10px' }} placeholder='How can we get better' value={message} onChange={e => setMessage(e?.target?.value)}></TextField>
                <Button variant='contained' style={{ width: '10rem', whiteSpace: 'nowrap', minWidth: 'auto', borderRadius: '10px' }} onClick={openModal}>Send message</Button>
            </div>
        </div>
    )

    return (
        <div className='contact-container'>
            {ContactImage}
            {ContactForm}
        </div>
    )
}
export default Contact;