import { useState } from 'react';
import Iconify from '../../../components/iconify';
import { Button, Modal, Box, Typography, FormControlLabel, FormControl, TextField } from '@mui/material';
import axiosNew from '../../../components/AxiosConfig';
// import ImageUpload from '../../../components/image-uploader/uploader';
// import { formatDistanceStrict } from 'date-fns';

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
  const [status, setStatus] = useState(1);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  async function submitDataNewPost(e) { 
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', name);
    formData.append('detail', detail);
    formData.append('image_slider', image);
    formData.append('status', status);
    await axiosNew.post('/slider', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      if(res.status === 201) {
        window.location.reload()
      } else {
        alert(res.data.message)
      }
    });
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
            <TextField
              required
              accept="image/*"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
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
