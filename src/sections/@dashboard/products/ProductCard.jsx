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
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect, useRef } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import { BarLoader } from 'react-spinners';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import { LocationModels } from '../../../models/Location_Models';
import { StatusInvestmentModels } from '../../../models/Status_Investment_Models';
import { StatusCampaignModels } from '../../../models/Status_Campaign_Models';
// ----------------------------------------------------------------------

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

const override = {
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  position: 'absolute',
};

export default function ShopProductCard() {
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [idProduct, setIdProduct] = useState();

  const [imageProduct, setImageProduct] = useState('');

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
    editLangtitude: '',
    editLongtitude: '',
    editTenor: 0,
    editPercentangeImbal: 0,
    editPeriodImbal: 0,
    editDetail: '',
    editProductDetailId: 0,
    editUpdatedAt: new Date(),
  });

  const editId = editData.editId;

  const [imageArray, setImageArray] = useState([]);
  const [openEditData, setOpenEditData] = useState(false);

  const token = localStorage.getItem('token');
  function deleteProduct(id) {
    const decrypt = CryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);

    axiosNew
      .delete(`/product/${id}`, {
        headers: {
          Authorization: decrypt.toString(CryptoJS.enc.Utf8),
        },
      })
      .then(() => {
        window.location.reload();
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

  function handleOpen(id) {
    setImageArray([]);
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
    langtitude,
    longtitude,
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

  useEffect(() => {
    async function getProduct() {
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
    getDataProspectus();
    getProduct();
  }, []);

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
          async function getProduct() {
            await axiosNew
              .get('/product')
              .then((result) => {
                if (result.status === 200) {
                  setDataProduct(result.data.data);
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status Invesment</TableCell>
              <TableCell>Total Invesment</TableCell>
              <TableCell>Complete Invesment</TableCell>
              <TableCell>Minimun Invesment</TableCell>
              <TableCell>Total Lot</TableCell>
              <TableCell>Total Investor</TableCell>
              <TableCell>Remaining Days</TableCell>
              <TableCell>Business ID</TableCell>
              <TableCell>Product Image</TableCell>
              <TableCell>Status Campaign</TableCell>
              <TableCell>Langtitude</TableCell>
              <TableCell>Longtitude</TableCell>
              <TableCell>Tenor</TableCell>
              <TableCell>Percentage Imbal</TableCell>
              <TableCell>Period Imbal</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Product Detail ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataProduct.map((result, i) => {
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
                  <TableCell align="left">{result.langtitude}</TableCell>
                  <TableCell align="left">{result.longtitude}</TableCell>
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
                          result.langtitude,
                          result.longtitude,
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
        <Box sx={boxStyle} noValidate autoComplete="off">
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
                src={`https://ed4a-114-124-239-45.ngrok-free.app/dashboard-api/static/product/${e}`}
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
            {/* <TextField
              required
              id="outlined"
              label="Location"
              type="text"
              value={editData.editLocation}
              onChange={(e) => setEditData({ ...editData, editLocation: e.target.value })}
              style={textFieldStyle}
            /> */}
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
              onChange={(e) => setEditData({ ...editData, editTotalInvestment: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Complete Invesment"
              type="number"
              value={editData.editCompleteInvesment}
              onChange={(e) => setEditData({ ...editData, editCompleteInvestment: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Minimum Invesment"
              type="number"
              value={editData.editMinimumInvesment}
              onChange={(e) => setEditData({ ...editData, editMinimumInvestment: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Lot"
              type="number"
              value={editData.editTotalLot}
              onChange={(e) => setEditData({ ...editData, editTotalLot: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Investor"
              type="number"
              value={editData.editTotalInvestor}
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
            <TextField
              required
              id="outlined"
              label="Langtitude"
              type="text"
              value={editData.editLangtitude}
              onChange={(e) => setEditData({ ...editData, editLangtitude: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Longtitude"
              type="text"
              value={editData.editLongtitude}
              onChange={(e) => setEditData({ ...editData, editLongtitude: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Tenor"
              type="number"
              value={editData.editTenor}
              onChange={(e) => setEditData({ ...editData, editTenor: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Percentange Imbal"
              type="number"
              value={editData.editPercentangeImbal}
              onChange={(e) => setEditData({ ...editData, editPercentangeImbal: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Period Imbal"
              type="number"
              value={editData.editPeriodImbal}
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
            <TextField
              required
              id="outlined"
              label="Product Detail ID"
              type="number"
              value={editData.editProductDetailId}
              onChange={(e) => setEditData({ ...editData, editProductDetailId: e.target.value })}
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
                Updated At: {moment(editData.editUpdatedAt).utc().format('MMMM Do YYYY, h:mm:ss a')}
              </Typography>
            </Box>
            <Button
              onClick={submitEditProduct}
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
