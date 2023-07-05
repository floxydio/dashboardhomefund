import { useState } from 'react';
import Iconify from '../../../components/iconify';
import { Button, Modal, Box, Typography, FormControlLabel, FormControl, TextField } from '@mui/material';
import axiosNew from '../../../components/AxiosConfig';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const textFieldStyle = {
  marginBottom: 10,
  marginTop: 10,
};

export default function NewPost() {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  async function submitDataNewPost(e) {
    e.preventDefault();
    await axiosNew.post(
      '/slider',
      {
        name: name,
        detail: detail,
        image: image,
        status: status,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }
  return (
    <>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
        New Post
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle} noValidate autoComplete="off">
          <Typography
            style={{
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Masukan Data Slider
          </Typography>
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              required
              id="outlined"
              label="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Detail"
              type="text"
              onChange={(e) => setDetail(e.target.value)}
              style={textFieldStyle}
            />
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}
