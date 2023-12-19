import { useState } from 'react';
import Iconify from '../../../components/iconify';
import { Button, Modal, Box, Typography, FormControlLabel, FormControl, TextField } from '@mui/material';
import axiosNew from '../../../components/AxiosConfig';
import cryptoJs from 'crypto-js';
// import ImageUpload from '../../../components/image-uploader/uploader';
// import { formatDistanceStrict } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import ReactQuill from 'react-quill';
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
  const [image, setImage] = useState();
  const [status, setStatus] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const token = localStorage.getItem('token');

  async function submitDataNewPost(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('name', name);
    formData.append('detail', detail);
    formData.append('image_slider', image);
    formData.append('status', status);

    const decrypt = cryptoJs.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .post('/slider', formData, {
        headers: {
          Authorization: decrypt.toString(cryptoJs.enc.Utf8),
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          alert(err.response.data.message);
        }
      });
  }

  return (
    <>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
        Buat Postingan
      </Button>
      <Modal
        open={open}
        sx={{
          height: 500,
          overflowY: 'scroll',
          marginTop: 10,
          width: isMobile ? '85%' : '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        onClose={handleClose}
      >
        <Box
          sx={{
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
          }}
          noValidate
          autoComplete="off"
        >
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
              label="Nama"
              type="text"
              onChange={(e) => setName(e.target.value)}
              style={textFieldStyle}
            />
            <ReactQuill
              theme="snow"
              value={detail}
              onChange={(e) => setDetail(e)}
              placeholder="Input Deskripsi"
              style={textFieldStyle}
            />
            <TextField
              required
              accept="image/*"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Status"
              type="number"
              onChange={(e) => setStatus(e.target.value)}
              style={textFieldStyle}
            />
            <Button
              onClick={submitDataNewPost}
              type="submit"
              sx={{
                height: 45,
                backgroundColor: 'blue',
                color: 'white',
                fontWeight: 'bold',
                borderColor: 'transparent',
                borderRadius: 20,
                marginTop: 2,
                '&:hover': {
                  backgroundColor: 'darkblue',
                },
              }}
            >
              Submit
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}
