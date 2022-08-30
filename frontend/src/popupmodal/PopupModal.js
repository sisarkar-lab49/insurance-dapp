import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

export default function PopupModal(props) {
    const [open, setOpen] = React.useState(props?.open);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>         
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>Thanks</span>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {props?.message}
                            <Button style={{ width: '150px' }} variant='contained' onClick={handleClose}>OK</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
