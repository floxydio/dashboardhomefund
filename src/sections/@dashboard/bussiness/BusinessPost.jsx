import { Button, Modal, Box, Typography, FormControl, TextField } from '@mui/material';
import Iconify from '../../../components/iconify';
import { useState } from 'react';
import jsPDF from 'jspdf';
import { useMediaQuery } from 'react-responsive';
import axiosNew from '../../../components/AxiosConfig';
import ReactQuill from 'react-quill';
import CryptoJS from 'crypto-js';

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

export default function BusinessPost() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [linkPropektus, setLinkPropektus] = useState('');

  const handleImageToPdf = async () => {
    if (!images) {
      console.error('No image selected.');
      return;
    }

    const doc = new jsPDF();
    const img = new Image();
    const img2 = new Image();
    const img3 = new Image();

    const imgLoadedPromise = new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const reader = new FileReader();
    reader.readAsDataURL(images);

    reader.onload = async () => {
      img.src = reader.result;

      try {
        await imgLoadedPromise;
        doc.addImage(img, 'JPEG', 10, 10);
        doc.save('a4.pdf');
      } catch (error) {
        console.error('Error loading the image:', error);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading the file:', error);
    };
  };
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const token = localStorage.getItem('token');

  async function submitDataPost(e) {
    e.preventDefault();

    const decrypt = CryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);

    let formData = new FormData();
    formData.append('name', name);
    formData.append('deskripsi', description);
    formData.append('file_prospektus', file);
    formData.append('link_prospektus', linkPropektus);

    await axiosNew
      .post('/prospektus', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: decrypt.toString(CryptoJS.enc.Utf8),
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // localStorage.removeItem('token');
          // window.location.href = '/login';
          alert(err.response.data.message);
        } else {
          alert(err.response.data.message);
        }
      });

    // addAllImageToPdf()
  }

  return (
    <>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
        New Post
      </Button>
      <Modal
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        open={open}
        onClose={handleClose}
        sx={{
          height: 500,
          overflowY: 'scroll',
          marginTop: 10,
          width: isMobile ? '85%' : '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
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
              marginBottom: '10',
            }}
            variant="h6"
            component="h2"
          >
            Masukan Data Bisnis
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
              value={description}
              onChange={(e) => setDescription(e)}
              placeholder="Input Deskripsi"
              style={textFieldStyle}
            />
            <TextField
              required
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              id="outlined"
              style={textFieldStyle}
            />
            <TextField
              required
              type="text"
              onChange={(e) => setLinkPropektus(e.target.value)}
              id="outlined"
              style={textFieldStyle}
              label="Link Propekstus"
            />
            <Button
              onClick={submitDataPost}
              type="submit"
              sx={{
                height: 45,
                backgroundColor: '#4169E1',
                color: 'white',
                fontWeight: 'bold',
                borderColor: 'transparent',
                borderRadius: 20,
                marginTop: 2,
                '&:hover': {
                  backgroundColor: '#4169E1',
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
