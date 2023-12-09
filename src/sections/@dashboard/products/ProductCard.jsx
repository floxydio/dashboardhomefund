// @mui
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import Iconify from '../../../components/iconify';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect, useRef } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import { LocationModels } from '../../../models/Location_Models';
import { StatusInvestmentModels } from '../../../models/Status_Investment_Models';
import { StatusCampaignModels } from '../../../models/Status_Campaign_Models';
import { nanoid } from 'nanoid';
import { useMediaQuery } from 'react-responsive';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// ----------------------------------------------------------------------

const textFieldStyle = {
  marginBottom: 15,
  marginTop: 15,
};

const override = {
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  position: 'absolute',
};

export default function ShopProductCard() {
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idProduct, setIdProduct] = useState();
  const [imageProduct, setImageProduct] = useState('');
  const [imageArray, setImageArray] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState('');

  //use State Modal
  const [open, setOpen] = useState(false);
  const [openEditData, setOpenEditData] = useState(false); //Ini Buat Edit Modal
  const [isOpenCreate, setIsOpenCreate] = useState(false); //Ini Buat Create Modal
  const [isOpenDelete, setIsOpenDelete] = useState(false); //Ini Buat Delete Modal

  // Media Query
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  const [newData, setNewData] = useState({
    category: 'Rumah',
    title: '',
    location: '',
    statusInvestment: 0,
    completeInvesment: 0,
    totalInvesment: 0,
    minimumInvesment: 0,
    totalLot: 0,
    totalInvestor: 0,
    remainingDays: null,
    businessId: 0,
    productImage: '',
    statusCampaign: 0,
    tenor: 0,
    percentange_imbal: 0,
    period_imbal: 0,
    detail: '',
    productDetailId: 0,
    createdAt: new Date(),
  });

  const [editData, setEditData] = useState({
    editId: '',
    editCategory: '',
    editTitle: '',
    editLocation: '',
    editStatusInvestment: 0,
    editTotalInvesment: 0,
    editCompleteInvesment: 0,
    editMinimumInvesment: 0,
    editTotalLot: 0,
    editTotalInvestor: 0,
    editRemainingDays: null,
    editBusinessId: 0,
    editProductImage: '',
    editStatusCampaign: 0,
    editTenor: 0,
    editPercentangeImbal: 0,
    editPeriodImbal: 0,
    editDetail: '',
    editProductDetailId: 0,
    editUpdatedAt: new Date(),
  });

  const editId = editData.editId;

  // const handleChangeBusinessId = (e) => {
  //   setNewData({ ...newData, businessId: e.target.value });
  // };

  const handleChangeStatusInvesment = (e) => {
    setNewData({ ...newData, statusInvestment: e.target.value });
  };

  const handleChangeLocation = (e) => {
    setNewData({ ...newData, location: e.target.value });
  };

  const handleChangeStatusCampaign = (e) => {
    setNewData({ ...newData, statusCampaign: e.target.value });
  };

  const token = localStorage.getItem('token');

  const openModalCreate = () => setIsOpenCreate(true);
  const closeModalCreate = () => setIsOpenCreate(false);

  const openModalDelete = () => setIsOpenDelete(true);
  const closeModalDelete = () => setIsOpenDelete(false);

  function deleteProduct(id) {
    const decrypt = CryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);

    axiosNew
      .delete(`/product/${id}`, {
        headers: {
          Authorization: decrypt.toString(CryptoJS.enc.Utf8),
        },
      })
      .then(() => {
        // setIsOpenDelete(false);
        getProduct();
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

  async function getProduct() {
    setDataProduct([]);

    const decrypt = CryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .get('/product', {
        headers: {
          Authorization: decrypt.toString(CryptoJS.enc.Utf8),
        },
      })
      .then((result) => {
        if (result.status === 200) {
          setDataProduct(result.data.data);
        }
      })
      .catch((err) => {
        // err response status code
        if (err.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          alert(err.response.data.message);
        }
      });
  }

  function handleOpen(id) {
    function getProductImage() {
      const decrypt = CryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
      axiosNew
        .get(`/product/${id}`, {
          headers: {
            Authorization: decrypt.toString(CryptoJS.enc.Utf8),

            Accept: 'application/json',
          },
        })
        .then((result) => {
          if (result.status === 200) {
            setImageArray(result.data.image);
            setOpen(true);
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
    getProductImage();
  }

  async function getDataProspectus() {
    const decrypt = CryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .get('/prospektus', {
        headers: {
          Authorization: decrypt.toString(CryptoJS.enc.Utf8),
        },
      })
      .then((result) => {
        setDataBusiness(result.data.data);
      });
  }

  function handleEditProduct(
    id,
    category,
    title,
    location,
    status_investment,
    total_invesment,
    complete_invesment,
    minimum_invesment,
    total_lot,
    total_investor,
    remaining_days,
    business_id,
    product_image,
    status_campaign,
    tenor,
    percentange_imbal,
    period_imbal,
    detail,
    product_detail_id,
    updatedAt
  ) {
    const updateData = {
      editId: id,
      editCategory: category,
      editTitle: title,
      editLocation: location,
      editStatusInvestment: status_investment,
      editTotalInvesment: total_invesment,
      editCompleteInvesment: complete_invesment,
      editMinimumInvesment: minimum_invesment,
      editTotalLot: total_lot,
      editTotalInvestor: total_investor,
      editRemainingDays: remaining_days,
      editBusinessId: business_id,
      editProductImage: product_image,
      editStatusCampaign: status_campaign,
      editLangtitude: langtitude,
      editLongtitude: longtitude,
      editTenor: tenor,
      editPercentangeImbal: percentange_imbal,
      editPeriodImbal: period_imbal,
      editDetail: detail,
      editProductDetailId: product_detail_id,
      editUpdatedAt: updatedAt,
    };

    setEditData(updateData);
    setOpenEditData(true);
  }

  const handleClose = () => setOpen(false);

  const handleCloseEditData = () => setOpenEditData(false);

  const [dataBusiness, setDataBusiness] = useState([]);

  const handleChangeEditLocation = (e) => {
    setEditData({ ...editData, editLocation: e.target.value });
  };

  const handleChangeEditStatusInvestment = (e) => {
    setEditData({ ...editData, editStatusInvestment: e.target.value });
  };

  const handleChangeEditStatusCampaign = (e) => {
    setEditData({ ...editData, editStatusCampaign: e.target.value });
  };

  const handleChangeEditBusinessId = (e) => {
    setEditData({ ...editData, editBusinessId: e.target.value });
  };

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

  function totalInvesmentInputCurrencyToIDR(e) {
    const value = e;
    const valueString = value
      .toString()
      .replace(/[^,\d]/g, '')
      .toString();
    const currency = valueString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setNewData({ ...newData, totalInvesment: currency });
  }

  function completeInvesmentInputCurrencyToIDR(e) {
    const value = e;
    const valueString = value
      .toString()
      .replace(/[^,\d]/g, '')
      .toString();
    const currency = valueString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setNewData({ ...newData, completeInvesment: currency });
  }

  function minimumInvesmentInputCurrencyToIDR(e) {
    const value = e;
    const valueString = value
      .toString()
      .replace(/[^,\d]/g, '')
      .toString();
    const currency = valueString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setNewData({ ...newData, minimumInvesment: currency });
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  async function submitDataProduct(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('category', 'Rumah');
    formData.append('title', newData.title);
    formData.append('location', newData.location);
    formData.append('status_investment', newData.statusInvestment);
    formData.append('complete_invesment', newData.completeInvesment.toString().replaceAll('.', ''));
    formData.append('total_invesment', newData.totalInvesment.toString().replace('.', ''));
    formData.append('minimum_investment', newData.minimumInvesment.toString().replaceAll('.', ''));
    formData.append('total_lot', newData.totalLot);
    formData.append('remaining_days', newData.remainingDays);
    formData.append('business_id', newData.businessId);
    for (let i = 0; i < files.length; i++) {
      formData.append('image_product', files[i][0]);
    }
    formData.append('status_campaign', newData.statusCampaign);
    formData.append('tenor', newData.tenor);
    formData.append('percentange_imbal', newData.percentange_imbal);
    formData.append('period_imbal', newData.period_imbal);
    formData.append('detail', newData.detail);
    formData.append('createdAt', newData.createdAt);

    const decrypt = CryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: decrypt.toString(CryptoJS.enc.Utf8),
        },
      })
      .then((res) => {
        // if (res.status === 200 || res.status === 201) {
        //   setIsOpenCreate(false);
        //   getProduct();
        // }
        console.log(res.data)
      })
      .catch((err) => {
        alert(err);
      });
    // console.log(newData.detail)
  }

  async function submitEditProduct(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('category', editData.editCategory);
    formData.append('title', editData.editTitle), formData.append('location', editData.editLocation);
    formData.append('status_investment', editData.editStatusInvestment);
    formData.append('total_invesment', editData.editTotalInvesment);
    formData.append('complete_invesment', editData.editCompleteInvesment);
    formData.append('minimum_invesment', editData.editMinimumInvesment);
    formData.append('total_lot', editData.editTotalLot);
    formData.append('total_investor', editData.editTotalInvestor);
    formData.append('remaining_days', editData.editRemainingDays);
    formData.append('business_id', editData.editBusinessId);
    formData.append('product_image', editData.editProductImage);
    formData.append('status_campaign', editData.editStatusCampaign);
    formData.append('product_detail_id', editData.editProductDetailId);
    formData.append('updatedAt', editData.editUpdatedAt);

    const decrypt = CryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .put(`/product/${editId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: decrypt.toString(CryptoJS.enc.Utf8),
        },
      })
      .then((result) => {
        if (result.status === 200 || result.status === 201) {
          setOpenEditData(false);
          getProduct();
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    getDataProspectus();
    getProduct();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={openModalCreate}
        style={{
          width: isMobile ? '100%' : '',
          marginRight: isMobile ? 20 : 0,
          marginBottom: isMobile ? 30 : 50,
          float: isMobile ? 'none' : 'right',
        }}
      >
        Product Baru
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
              marginBottom: 30,
            }}
            variant="h6"
            component="h2"
          >
            Masukan Data Product
          </Typography>
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              required
              id="outlined"
              label="Judul"
              type="text"
              onChange={(e) => setNewData({ ...newData, title: e.target.value })}
              style={textFieldStyle}
            />
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Lokasi</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={handleChangeLocation}
                autoWidth
                label="Lokasi"
                defaultValue={500}
              >
                <MenuItem value={500} disabled>
                  <em>Pilih Tempat Funding</em>
                </MenuItem>
                {LocationModels.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Status Investasi</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={handleChangeStatusInvesment}
                autoWidth
                label="Status Investasi"
                defaultValue={500}
              >
                <MenuItem value={500} disabled>
                  <em>Plih Status Investasi</em>
                </MenuItem>
                {StatusInvestmentModels.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              required
              id="outlined"
              label="Total Investor"
              value={newData.totalInvesment}
              onChange={(e) => totalInvesmentInputCurrencyToIDR(e.target.value)}
              InputProps={{
                startAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>Rp </span>,
              }}
              style={textFieldStyle}
            /> */}
            <TextField
              required
              id="outlined"
              label="Target Pendanaan"
              value={newData.completeInvesment}
              onChange={(e) => completeInvesmentInputCurrencyToIDR(e.target.value)}
              InputProps={{
                startAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>Rp </span>,
              }}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Minimal Investasi"
              value={newData.minimumInvesment}
              InputProps={{
                startAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>Rp </span>,
              }}
              onChange={(e) => minimumInvesmentInputCurrencyToIDR(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Lot"
              type="number"
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>LOT</span>,
              }}
              onChange={(e) => setNewData({ ...newData, totalLot: e.target.value })}
              style={textFieldStyle}
            />
            {/* <TextField
              required
              id="outlined"
              label="Total Investor"
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>Orang</span>,
              }}
              type="number"
              onChange={(e) => setNewData({ ...newData, totalInvestor: e.target.value })}
              style={textFieldStyle}
            /> */}
            <TextField
              required
              type="date"
              label="Masa Pengumpulan Dana"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setNewData({ ...newData, remainingDays: e.target.value })}
              style={textFieldStyle}
            />

            {/* <FormControl style={textFieldStyle}>
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
            </FormControl> */}
            <Stack>
              <div className="fileupload-view">
                <div className="row justify-content-center m-0">
                  <div className="col-md-6">
                    <div className="card mt-5">
                      <div className="kb-data-box">
                        <div className="kb-modal-data-title">
                          <div className="kb-data-title">
                            <h6 style={{ marginLeft: 20, marginBottom: 20 }}>Upload Gambar</h6>
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
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Status Produk</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={handleChangeStatusCampaign}
                autoWidth
                label="Status Produk"
                defaultValue={500}
              >
                <MenuItem value={500} disabled>
                  <em>Pilih Status Produk</em>
                </MenuItem>
                {StatusCampaignModels.map((campaign) => (
                  <MenuItem key={campaign.value} value={campaign.value}>
                    {campaign.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Tenor</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={(e) => setNewData({ ...newData, tenor: e.target.value })}
                autoWidth
                label="Tenor"
                defaultValue={500}
              // value={500}
              >
                <MenuItem value={500} disabled>
                  <em>Pilih Status Tenor</em>
                </MenuItem>
                <MenuItem value={3}>3 Bulan</MenuItem>
                <MenuItem value={6}>6 Bulan</MenuItem>
                <MenuItem value={9}>9 Bulan</MenuItem>
                <MenuItem value={12}>12 Bulan</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined"
              label="Persentase Imbal"
              type="number"
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>%</span>,
              }}
              onChange={(e) => setNewData({ ...newData, percentange_imbal: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Masa Funding"
              type="number"
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>Bulan</span>,
              }}
              onChange={(e) => setNewData({ ...newData, period_imbal: e.target.value })}
              style={textFieldStyle}
            />
            <ReactQuill theme="snow" value={newData.detail} onChange={(e) => setNewData({ ...newData, detail: e })} placeholder='Input Deskripsi' style={textFieldStyle} />

            <Typography sx={{ marginTop: 4, marginBottom: 4 }}>Dibuat Pada: {moment(newData.createdAt).utc().format('Do MMMM YYYY')}</Typography>
            <Button
              onClick={submitDataProduct}
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
      <TableContainer component={Paper} style={{ marginLeft: isMobile ? 20 : 0, marginRight: isMobile ? 20 : 0 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status Invesment</TableCell>
              <TableCell>Complete Invesment</TableCell>
              <TableCell>Minimun Invesment</TableCell>
              <TableCell>Total Lot</TableCell>
              <TableCell>Total Investor</TableCell>
              <TableCell>Remaining Days</TableCell>
              <TableCell>Business ID</TableCell>
              <TableCell>Product Image</TableCell>
              <TableCell>Status Campaign</TableCell>
              <TableCell>Tenor</TableCell>
              <TableCell>Percentage Imbal</TableCell>
              <TableCell>Period Imbal</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataProduct?.map((result, i) => {
              return (
                <TableRow sx={{ '&:last-child td, &:lastchild th': { border: 0 } }} key={result.id}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{result.category}</TableCell>
                  <TableCell align="left">{result.title}</TableCell>
                  <TableCell align="left">{result.location}</TableCell>
                  <TableCell align="left">{result.status_investment}</TableCell>
                  <TableCell align="left">Rp{result.total_invesment.toLocaleString()}</TableCell>
                  <TableCell align="left">Rp{result.complete_invesment.toLocaleString()}</TableCell>
                  <TableCell align="left">Rp{result.minimum_invesment.toLocaleString()}</TableCell>
                  <TableCell align="left">{result.total_lot.toLocaleString()}</TableCell>
                  <TableCell align="left">{result.total_investor}</TableCell>
                  <TableCell align="left">
                    {moment(result.remaining_days).utc().format('MMMM Do YYYY, h:mm:ss a')}
                  </TableCell>
                  <TableCell align="left">{result.business_id}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleOpen(result.id)}>
                      <InsertDriveFileIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">{result.status_campaign}</TableCell>
                  <TableCell align="left">{result.tenor}</TableCell>
                  <TableCell align="left">{result.percentange_imbal}%</TableCell>
                  <TableCell align="left">{result.period_imbal}%</TableCell>
                  <TableCell align="left">{result.detail}</TableCell>
                  <TableCell align="left">{result.product_detail_id}</TableCell>
                  <TableCell align="left">{moment(result.createdAt).utc().format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                  <TableCell align="left">{moment(result.updatedAt).utc().format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() =>
                        handleEditProduct(
                          result.id,
                          result.category,
                          result.title,
                          result.location,
                          result.status_investment,
                          result.total_invesment,
                          result.complete_invesment,
                          result.minimum_invesment,
                          result.total_lot,
                          result.total_investor,
                          result.remaining_days,
                          result.business_id,
                          result.product_image,
                          result.status_campaign,
                          result.tenor,
                          result.percentange_imbal,
                          result.period_imbal,
                          result.detail,
                          result.product_detail_id,
                          result.updatedAt
                        )
                      }
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => deleteProduct(result.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
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
            variant="h5"
            sx={{
              textAlign: 'center',
              marginBottom: 3,
            }}
          >
            Product Image
          </Typography>
          {imageArray.map((e, i) => (
            <div key={i}>
              <img
                src={`https://ae34-182-0-103-126.ngrok-free.app/dashboard-api/static/product/${e}`}
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: 20,
                  width: 290,
                  objectFit: 'cover',
                }}
                alt="Test"
              />
            </div>
          ))}
        </Box>
      </Modal>
      <Modal
        open={openEditData}
        onClose={handleCloseEditData}
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
            Edit Data Product
          </Typography>
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              required
              id="outlined"
              label="Category"
              type="text"
              value={editData.editCategory}
              onChange={(e) => setEditData({ ...editData, editCategory: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Title"
              type="text"
              value={editData.editTitle}
              onChange={(e) => setEditData({ ...editData, editTitle: e.target.value })}
              style={textFieldStyle}
            />
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={editData.editLocation}
                onChange={handleChangeEditLocation}
                autoWidth
                label="Location"
                defaultValue=""
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {LocationModels.map((location) => (
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
                value={editData.editStatusInvestment}
                onChange={handleChangeEditStatusInvestment}
                autoWidth
                label="Status Invesment"
                defaultValue=""
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {StatusInvestmentModels.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined"
              label="Total Invesment"
              type="number"
              value={editData.editTotalInvesment}
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>RP</span>,
              }}
              onChange={(e) => setEditData({ ...editData, editTotalInvestment: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Complete Invesment"
              type="number"
              value={editData.editCompleteInvesment}
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>RP</span>,
              }}
              onChange={(e) => setEditData({ ...editData, editCompleteInvestment: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Minimum Invesment"
              type="number"
              value={editData.editMinimumInvesment}
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>RP</span>,
              }}
              onChange={(e) => setEditData({ ...editData, editMinimumInvestment: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Lot"
              type="number"
              value={editData.editTotalLot}
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>LOT</span>,
              }}
              onChange={(e) => setEditData({ ...editData, editTotalLot: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Investor"
              type="number"
              value={editData.editTotalInvestor}
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>Orang</span>,
              }}
              onChange={(e) => setEditData({ ...editData, editTotalInvestor: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              type="date"
              label="Remaining Days"
              InputLabelProps={{ shrink: true }}
              value={editData.editRemainingDays}
              onChange={(e) => setEditData({ ...editData, editRemainingDays: e.target.value })}
              style={textFieldStyle}
            />
            {/* <TextField
              required
              id="outlined"
              label="Business ID"
              type="number"
              value={editData.editBusinessId}
              onChange={(e) => setEditData({ ...editData, editBusinessId: e.target.value })}
              style={textFieldStyle}
            /> */}
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Business ID</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={editData.editBusinessId}
                onChange={handleChangeEditBusinessId}
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
            <TextField
              required
              accept="image/*"
              type="file"
              onChange={(e) => setEditData({ ...editData, editProductImage: e.target.files[0] })}
              style={textFieldStyle}
            />
            {/* <TextField
              required
              id="outlined"
              label="Status Campaign"
              type="number"
              value={editData.editStatusCampaign}
              onChange={(e) => setEditData({ ...editData, editStatusCampaign: e.target.value })}
              style={textFieldStyle}
            /> */}
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Status Campaign</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={editData.editStatusCampaign}
                onChange={handleChangeEditStatusCampaign}
                autoWidth
                label="Status Campaign"
                defaultValue=""
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {StatusCampaignModels.map((campaign) => (
                  <MenuItem key={campaign.value} value={campaign.value}>
                    {campaign.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Tenor</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={(e) => setEditData({ ...editData, editTenor: e.target.value })}
                autoWidth
                label="Tenor"
                defaultValue={500}
              // value={500}
              >
                <MenuItem value={500} disabled>
                  <em>Pilih Status Tenor</em>
                </MenuItem>
                <MenuItem value={3}>3 Bulan</MenuItem>
                <MenuItem value={6}>6 Bulan</MenuItem>
                <MenuItem value={9}>9 Bulan</MenuItem>
                <MenuItem value={12}>12 Bulan</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined"
              label="Percentange Imbal"
              type="number"
              value={editData.editPercentangeImbal}
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>%</span>,
              }}
              onChange={(e) => setEditData({ ...editData, editPercentangeImbal: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Period Imbal"
              type="number"
              value={editData.editPeriodImbal}
              InputProps={{
                endAdornment: <span style={{ marginRight: 5, color: 'grey', fontWeight: 'bold' }}>Bulan</span>,
              }}
              onChange={(e) => setEditData({ ...editData, editPeriodImbal: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Detail"
              type="text"
              value={editData.editDetail}
              onChange={(e) => setEditData({ ...editData, editDetail: e.target.value })}
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
              <Typography>
                Diupdate Pada: {moment(editData.editUpdatedAt).utc().format('MMMM Do YYYY, h:mm:ss a')}
              </Typography>
            </Box>
            <Button
              onClick={submitEditProduct}
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
