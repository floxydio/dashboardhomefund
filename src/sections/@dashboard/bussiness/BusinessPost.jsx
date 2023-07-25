import { Button, Modal, Box, Typography, FormControl, TextField } from '@mui/material';
import Iconify from '../../../components/iconify';
import { useState } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from '../../@dashboard/bussiness/BusinessRenderer';

export default function BusinessPost() {

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

    const [name, setName] = useState('');
    const [file, setFile] = useState();
    const [description, setDescription] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function submitDataPost(e) {
      e.preventDefault();
      let data = new FormData();
      data.append('name', name);
      data.append('file', file);
      data.append('description', description);
      
      await axiosNew.post('/prospektus', data, {
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
        <Button variant="contained" 
        startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
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
            <TextField
              required
              accept="file/*"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={textFieldStyle}
            />
              <PDFViewer>
    <MyDocument />
  </PDFViewer>
            <Button
              onClick={submitDataPost}
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
    )
}
