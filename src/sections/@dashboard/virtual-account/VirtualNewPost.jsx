import {
  Box,
  Typography,
  Button,
  Modal,
  FormControl,
  TextField,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import Iconify from '../../../components/iconify/Iconify';
import { useMediaQuery } from 'react-responsive'
import { nanoid } from 'nanoid';
import moment from 'moment';
import ReactQuill from 'react-quill';
import CryptoJS from 'crypto-js';
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
  overflowY: 'scroll',
  height: 500,
  p: 4,
};

const textFieldStyle = {
  marginBottom: 10,
  marginTop: 10,
};

export default function VirtualAccountNewPost() {
  const [newData, setNewData] = useState({
    name: '',
    icon: '',
    vat: 0,
    status: 1,
    description: '',
    type_va: 0,
  });
  
  // Media Query
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  const token = localStorage.getItem('token')

  // UseState Modal
  const [open, setOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false); // Create Modal


  const handleClose = () => setOpen(false);
  function handleOpen() {
    setOpen(true);
  }

  const [selectedFile, setSelectedFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [dataVA, setDataVA] = useState([]);

  const openModalCreate = () => setIsOpenCreate(true);
  const closeModalCreate = () => setIsOpenCreate(false);

  const inputChange = (e) => {
    const images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
      const reader = new FileReader();
      const file = e.target.files[i];
      reader.onloadend = () => {
        setSelectedFile((preValue) => {
          return [
            ...preValue,
            {
              id: nanoid(),
              filename: e.target.files[i].name,
              filetype: e.target.files[i].type,
              fileimage: reader.result,
            },
          ];
        });
      };
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
      }
    }
    files.push(images)
  };

  const deleteSelectedFile = (id) => {
    if (window.confirm('Ingin menghapus gambar ini?')) {
      const result = selectedFile.filter((data) => data.id !== id);
      setSelectedFile(result);
    } else {
      //alert ("No")
    }
  }

  async function submitDataVA(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('name', newData.name);
    for (let i = 0; i < files.length; i++) {
      formData.append('image_va', files[i][0]);
    }
    formData.append('vat', newData.vat);
    formData.append('status', newData.status);
    formData.append('description', newData.description);
    formData.append('type_va', newData.type_va);

    const decrypt = CryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .post('/virtualaccount', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: decrypt.toString(CryptoJS.enc.Utf8),
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsOpenCreate(false);
          window.location.reload()
        }
      })
      .catch((err) => {
        alert(err);
      })
  }

  return (
    <>
      <Button 
        variant="contained" 
        startIcon={<Iconify 
        icon="eva:plus-fill" 
        />} 
        onClick={openModalCreate}
        style={{
          width: isMobile ? '100%' : '',
          marginRight: isMobile ? 20 : 0,
          marginBottom: isMobile ? 30 : 50,
          float: isMobile ? 'none' : 'right',
        }}
      >
      New Post
      </Button>
      <Modal
        open={isOpenCreate}
        onClose={closeModalCreate}
        sx={{
          height: 500,
          overflowY: 'scroll',
          marginTop: 10,
          width: isMobile ? '85%' : '100%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <Box 
          sx={boxStyle} 
          noValidate 
          autoComplete="off"
        >
          <Typography
            style={{
              textAlign: 'center',
              marginBottom: '30',
            }}
            variant="h6"
            component="h2"
          >
            Masukan Data Virtual Account
          </Typography>
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            required
            id="outlined"
            label="Nama"
            type="text"
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            style={textFieldStyle}
          />
          <Stack>
            <div className="fileupload-view">
              <div className="row justify-content-center m-0">
                <div className="col-md-6">
                  <div className="card mt-5">
                    <div className="kb-data-box">
                      <div className="kb-modal-data-title">
                        <div className="kb-data-title">
                          <h6>Upload Gambar</h6>
                        </div>
                      </div>
                      <form>
                        <div className="kb-file-upload">
                          <div className="file-upload-box">
                            <input 
                              type="file"
                              id="fileupload"
                              className="file-upload-input"
                              onChange={inputChange}
                              multiple
                            />
                            <span>
                              Tarik dan letakan atau <span className="file-link">Pilih gambar</span>
                            </span>
                          </div>
                        </div>
                        <div className="kb-attach-box mb-3">
                          {selectedFile.map((data) => {
                            const {id ,filename, fileimage} = data;
                            return (
                              <div className="file-atc-box" key={id}>
                                {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                                  <div className="file-image">
                                    {' '}
                                    <img src={fileimage} alt="" />
                                  </div>
                                ) : (
                                  <div className="file-image">
                                    <i className="far fa-file-alt"></i>
                                  </div>
                                )}
                                <div className="file-detail">
                                  <h6 className="title-image">{filename}</h6>
                                  <div className="file-actions">
                                    <button 
                                      type="button"
                                      className="file-action-btn"
                                      onClick={() => deleteSelectedFile(id)}
                                    >
                                      Hapus
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Stack>
          <TextField 
            required
            id="outlined"
            label="VAT"
            type="number"
            onChange={(e) => setNewData({ ...newData, vat: e.target.value })}
            style={textFieldStyle}
          />
          <TextField 
            required
            id="outlined"
            label="Status"
            type="number"
            onChange={(e) => setNewData({ ...newData, status: e.target.value })}
            style={textFieldStyle}
          />
          <ReactQuill 
            theme="snow"
            value={newData.description}
            onChange={(e) => setNewData({ ...newData, description: e })}
            placeholder="Deskripsi"
            style={textFieldStyle}
          />
          <TextField 
            required
            id="outlined"
            label="Tipe VA"
            type="number"
            onChange={(e) => setNewData({ ...newData, type_va: e.target.value })}
          />
          <Typography sx={{ marginTop: 4, marginBottom: 4 }}>
              Dibuat Pada: {moment(newData.createdAt).utc().format('Do MMMM YYYY')}
          </Typography>
            <Button
              onClick={submitDataVA}
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
            <Button
              onClick={() => setIsOpenCreate(false)}
              type="submit"
              sx={{
                height: 45,
                backgroundColor: 'red',
                color: 'white',
                fontWeight: 'bold',
                borderColor: 'transparent',
                borderRadius: 20,
                marginTop: 2,
                '&:hover': {
                  backgroundColor: 'red',
                },
              }}
            >
              Tutup
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}
