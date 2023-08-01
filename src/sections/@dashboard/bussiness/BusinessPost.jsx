import { Button, Modal, Box, Typography, FormControl, TextField } from '@mui/material';
import Iconify from '../../../components/iconify';
import { useState } from 'react';
import jsPDF from 'jspdf';

export default function BusinessPost() {
  const [newData, setNewData] = useState({
    name: '',
    file: '',
    description: '',
  });

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

  
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  
  const handleImageToPdf = async () => {
    if (!images) {
      console.error("No image selected.");
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
        doc.addImage(img, "JPEG", 10, 10);
        doc.save("a4.pdf");
      } catch (error) {
        console.error("Error loading the image:", error);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading the file:", error);
    };
  };



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function submitDataPost(e) {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append('name', name);
    // formData.append('file_prospektus', file);
    // formData.append('description', description);
    // await axiosNew
    //   .post('/prospektus', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     if (res.status === 201) {
    //       window.location.reload();
    //     } else {
    //       alert(res.data.message);
    //     }
    //   });

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
        }}
      >
        <Box sx={boxStyle} noValidate autoComplete="off">
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
              label="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Deskripsi"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              style={textFieldStyle}
            />
            <TextField type='file' onChange={(e) => setImages(e.target.files[0])} />
            <Button
              onClick={() => handleImageToPdf()}
              type="submit"
              sx={{
                height: 45,
                backgroundColor: 'blue',
                color: 'white',
                fontWeight: 'bold',
                borderColor: 'transparent',
                borderRadius: 20,
                marginTop: 2,
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
