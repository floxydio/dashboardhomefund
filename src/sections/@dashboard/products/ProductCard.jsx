import PropTypes from 'prop-types';
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
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import { BarLoader } from 'react-spinners';
import moment from 'moment';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

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
    editProductDetailId: 0,
    editUpdatedAt: new Date(),
  });

  const [date, setDate] = useState(editData.editRemainingDays);

  const editId = editData.editId;

  const [openEditData, setOpenEditData] = useState(false);

  const handleDateChange = (date) => {
    setEditData({
      ...editData,
      editRemainingDays: date,
    });
  };

  function handleOpen(image) {
    setOpen(true);
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
      editProductDetailId: product_detail_id,
      editUpdatedAt: updatedAt,
    };

    setEditData(updateData);
    setOpenEditData(true);
  }

  const handleClose = () => setOpen(false);

  const handleCloseEditData = () => setOpenEditData(false);

  useEffect(() => {
    async function getProduct() {
      await axiosNew.get('/product').then((result) => {
        setDataProduct(result.data.data);
        console.log(result.data.data);
      });
    }
    getProduct();
  }, []);

  async function submitEditProduct(e) {
    e.preventDefault();

    await axiosNew
      .put(`/product/${editId}`, editData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        if (result.status === 200 || result.status === 201) {
          setOpenEditData(false);
          async function getProduct() {
            await axiosNew.get('/product').then((result) => {
              setDataProduct(result.data.data);
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
              <TableCell>Product Detail ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Edit</TableCell>
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
                    <Button onClick={() => handleOpen(result.product_image)}>
                      <InsertDriveFileIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">{result.status_campaign}</TableCell>
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
                          result.product_detail_id,
                          result.updatedAt
                        )
                      }
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle} noValidate autoComplete="off">
          {loading ? (
            <BarLoader
              color="#274F99"
              loading={loading}
              size={30}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <img src={`https://dev.homefund-id.tech/dashboard-api/static/product`} alt="Image Should be Here" />
          )}
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
            <TextField
              required
              id="outlined"
              label="Location"
              type="text"
              value={editData.editLocation}
              onChange={(e) => setEditData({ ...editData, editLocation: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Status Invesment"
              type="number"
              value={editData.editStatusInvestment}
              onChange={(e) => setEditData({ ...editData, editStatusInvestment: e.target.value })}
              style={textFieldStyle}
            />
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
            //ini remaining_days
            <LocalizationProvider dateAdapter={dayjs}>
              <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
            </LocalizationProvider>
            <TextField
              required
              id="outlined"
              label="Business ID"
              type="number"
              value={editData.editBusinessId}
              onChange={(e) => setEditData({ ...editData, editBusinessId: e.target.value })}
              style={textFieldStyle}
            />
            //Product Image Belum
            <TextField
              required
              id="outlined"
              label="Status Campaign"
              type="number"
              value={editData.editStatusCampaign}
              onChange={(e) => setEditData({ ...editData, editStatusCampaign: e.target.value })}
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
              onClick={(e) => e}
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
