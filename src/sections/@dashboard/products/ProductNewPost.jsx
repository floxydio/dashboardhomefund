import { useEffect, useState } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import Iconify from '../../../components/iconify';
import cryptoJS from 'crypto-js';
import { nanoid } from 'nanoid';
import ProductUploadImageCss from '../products/ProductImageStyle.css';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  ListItemButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  selectClasses,
} from '@mui/material';
import moment from 'moment';
import { KeyboardArrowDown } from '@mui/icons-material';

const styleProductUpload = {
  ProductUploadImageCss,
};

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
export default function ProductNewPost() {
  const [newData, setNewData] = useState({
    category: '',
    title: '',
    location: '',
    statusInvestment: 0,
    totalInvesment: 0,
    completeInvesment: 0,
    minimumInvesment: 0,
    totalLot: 0,
    totalInvestor: 0,
    remainingDays: null,
    businessId: 0,
    productImage: '',
    statusCampaign: 0,
    langtitude: '',
    longtitude: '',
    tenor: 0,
    percentange_imbal: 0,
    period_imbal: 0,
    detail: '',
    productDetailId: 0,
    createdAt: new Date(),
  });

  const handleChangeBusinessId = (e) => {
    setNewData({ ...newData, businessId: e.target.value });
  };

  const handleChangeStatusInvesment = (e) => {
    setNewData({ ...newData, statusInvestment: e.target.value });
  };

  const handleChangeLocation = (e) => {
    setNewData({ ...newData, location: e.target.value });
  };

  const handleChangeStatusCampaign = (e) => {
    setNewData({ ...newData, statusCampaign: e.target.value });
  };

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [dataBusiness, setDataBusiness] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getDataProspectus() {
      const decrypt = cryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
      await axiosNew
        .get('/prospektus', {
          headers: {
            Authorization: decrypt.toString(cryptoJS.enc.Utf8),
          },
        })
        .then((result) => {
          setDataBusiness(result.data.data);
        });
    }
    getDataProspectus();
  }, []);

  async function submitDataProduct(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('category', newData.category);
    formData.append('title', newData.title), formData.append('location', newData.location);
    formData.append('status_investment', newData.statusInvestment);
    formData.append('total_investment', newData.totalInvesment);
    formData.append('complete_invesment', newData.completeInvesment);
    formData.append('minimum_investment', newData.minimumInvesment);
    formData.append('total_lot', newData.totalLot);
    formData.append('total_investor', newData.totalInvestor);
    formData.append('remaining_days', newData.remainingDays);
    formData.append('business_id', newData.businessId);
    for (let i = 0; i < files.length; i++) {
      formData.append('image_product', files[i][0]);
    }
    formData.append('status_campaign', newData.statusCampaign);
    formData.append('langtitude', newData.langtitude);
    formData.append('longtitude', newData.longtitude);
    formData.append('tenor', newData.tenor);
    formData.append('percentange_imbal', newData.percentange_imbal);
    formData.append('period_imbal', newData.period_imbal);
    formData.append('detail', newData.detail);
    formData.append('product_detail_id', newData.productDetailId);
    formData.append('createdAt', newData.createdAt);

    const decrypt = cryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: decrypt.toString(cryptoJS.enc.Utf8),
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setOpen(false);
          async function getProduct() {
            await axiosNew
              .get('/product', {
                headers: {
                  Authorization: decrypt.toString(cryptoJS.enc.Utf8),
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  setProduct(res.data.data);
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
          getProduct();
        }
      });
  }

  const [selectedFile, setSelectedFile] = useState([]);
  const [files, setFiles] = useState([]);

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
    files.push(images);
  };

  const deleteSelectFile = (id) => {
    if (window.confirm('Ingin menghapus gambar ini?')) {
      const result = selectedFile.filter((data) => data.id !== id);
      setSelectedFile(result);
    } else {
      // alert ('No');
    }
  };

  const optionLocation = ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'];

  const optionStatusInvestment = [
    {
      value: 1,
      status: 'Tersedia',
    },
    {
      value: 2,
      status: 'Incoming',
    },
    {
      value: 3,
      status: 'Terpenuhi',
    },
  ];

  const optionStatusCampaign = [
    {
      value: 1,
      status: 'Pre-Order',
    },
    {
      value: 2,
      status: 'Pengumpulan Dana',
    },
    {
      value: 3,
      status: 'Pengumpulan Selesai',
    },
    {
      value: 4,
      status: 'Pembagian',
    },
  ];

  function completeInvesmentInputCurrencyToIDR(e) {
    const value = e;
    console.log("Step 1 ->" + value)
    const valueString = value.toString().replace(/[^,\d]/g, '').toString();
    console.log("Step 2 ->" + valueString)
    const currency = valueString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    console.log("Step 3 ->" + currency)
    setNewData({ ...newData, completeInvesment: currency });
  }

  function minimumInvesmentInputCurrencyToIDR(e) {
    const value = e;
    console.log("Step 1 ->" + value)
    const valueString = value.toString().replace(/[^,\d]/g, '').toString();
    console.log("Step 2 ->" + valueString)
    const currency = valueString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    console.log("Step 3 ->" + currency)
    setNewData({ ...newData, minimumInvesment: currency});
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
        }}
      >
        <Box sx={boxStyle} noValidate autoComplete="off">
          <Typography
            style={{
              textAlign: 'center',
              marginBottom: '30',
            }}
            variant="h6"
            component="h2"
          >
            Masukan Data Product
          </Typography>
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              disabled
              id="outlined"
              label="Category"
              type="text"
              defaultValue="Rumah"
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Title"
              type="text"
              onChange={(e) => setNewData({ ...newData, title: e.target.value })}
              style={textFieldStyle}
            />
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={newData.location}
                onChange={handleChangeLocation}
                autoWidth
                label="Location"
                defaultValue=""
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {optionLocation.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Status Investment</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={newData.statusInvestment}
                onChange={handleChangeStatusInvesment}
                autoWidth
                label="Status Invesment"
                defaultValue=""
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {optionStatusInvestment.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              required
              id="outlined"
              label="Total Invesment"
              type="number"
              onChange={(e) => setNewData({ ...newData, totalInvesment: e.target.value })}
              style={textFieldStyle}
            /> */}
            <TextField
              required
              id="outlined"
              label="Complete Invesment"
              value={newData.completeInvesment}
              onChange={(e) => completeInvesmentInputCurrencyToIDR(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Minimum Invesment"
              value={newData.minimumInvesment}
              onChange={(e) => minimumInvesmentInputCurrencyToIDR(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Lot"
              type="number"
              onChange={(e) => setNewData({ ...newData, totalLot: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Investor"
              type="number"
              onChange={(e) => setNewData({ ...newData, totalInvestor: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              type="date"
              label="Remaining Days"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setNewData({ ...newData, remainingDays: e.target.value })}
              style={textFieldStyle}
            />
            {/* <TextField
              required
              id="outlined"
              label="Business ID"
              type="number"
              onChange={(e) => setNewData({ ...newData, businessId: e.target.value })}
              style={textFieldStyle}
            /> */}
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Business ID</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={newData.businessId}
                onChange={handleChangeBusinessId}
                autoWidth
                label="Business ID"
                defaultValue=""
              >
                {dataBusiness.map((data) => (
                  <MenuItem key={data.id} value={data.id}>
                    {data.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                              const { id, filename, fileimage } = data;
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
                                        onClick={() => deleteSelectFile(id)}
                                      >
                                        Delete
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
            {/* <TextField
              required
              id="outlined"
              label="Status Campaign"
              type="number"
              onChange={(e) => setNewData({ ...newData, statusCampaign: e.target.value })}
              style={textFieldStyle}
            /> */}
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Status Campaign</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={newData.statusCampaign}
                onChange={handleChangeStatusCampaign}
                autoWidth
                label="Status Campaign"
                defaultValue=""
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {optionStatusCampaign.map((campaign) => (
                  <MenuItem key={campaign.value} value={campaign.value}>
                    {campaign.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined"
              label="Langtitude"
              type="text"
              onChange={(e) => setNewData({ ...newData, langtitude: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Longtitude"
              type="text"
              onChange={(e) => setNewData({ ...newData, longtitude: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Tenor"
              type="number"
              onChange={(e) => setNewData({ ...newData, tenor: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Percentange Imbal"
              type="number"
              onChange={(e) => setNewData({ ...newData, percentange_imbal: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Period Imbal"
              type="number"
              onChange={(e) => setNewData({ ...newData, period_imbal: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Detail"
              type="text"
              onChange={(e) => setNewData({ ...newData, detail: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Product Detail ID"
              type="number"
              onChange={(e) => setNewData({ ...newData, productDetailId: e.target.value })}
              style={textFieldStyle}
            />
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#fff',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography>Created At: {moment(newData.createdAt).utc().format('MMMM Do YYYY, h:mm:ss a')}</Typography>
            </Box>
            <Button
              onClick={submitDataProduct}
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
