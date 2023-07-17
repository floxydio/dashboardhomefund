import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import Iconify from '../../../components/iconify/Iconify';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflowY: 'scroll',
  height: 500,
  p: 4,
};

const textFieldStyle = {
  marginBottom: 10,
};

export default function VirtualAccountNewPost() {
  const [newData, setNewData] = useState({
    name: '',
    icon: '',
    description: '',
    vat: 0,
    status: 0,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onChange={handleOpen}>
        New Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          height: 500,
          overflowY: 'scroll',
          marginTop: 10,
        }}
      >
        <Box sx={boxStyle} noValidate autoComplete="off">
          <Typography
            style={{
              textAlign: 'center',
              marginBottom: 10,
            }}
            variant="h6"
            component="h2"
          >
            Masukan Data Virtual Account
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
