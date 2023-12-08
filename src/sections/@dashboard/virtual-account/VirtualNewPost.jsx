import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Iconify from '../../../components/iconify/Iconify';
import { useMediaQuery } from 'react-responsive'

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

  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  function handleOpen() {
    setOpen(true);
  }

  return (
    <>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
        New Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          height: 500,
          overflowY: 'scroll',
          marginTop: 10,
          width: isMobile ? '85%' : '100%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '100%' : 500,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          overflowY: 'scroll',
          height: 500,
          p: 4,
        }} noValidate autoComplete="off">
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

          <TextField
            required
            id="outlined"
            label="Name"
            type="text"
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            style={textFieldStyle}
          />
          <TextField
            required
            id="outlined"
            label="Icon"
            type="text"
            onChange={(e) => setNewData({ ...newData, icon: e.target.value })}
            style={textFieldStyle}
          />
          <TextField
            required
            id="outlined"
            label="Description"
            type="text"
            onChange={(e) => setNewData({ ...newData, description: e.target.value })}
            style={textFieldStyle}
          />
        </Box>
      </Modal>
    </>
  );
}
