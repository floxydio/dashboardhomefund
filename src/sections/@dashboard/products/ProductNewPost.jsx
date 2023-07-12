import { useState, useEffect } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import Iconify from '../../../components/iconify';
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material';
import moment from 'moment';

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
    productDetailId: 0,
    createdAt: new Date(),
  });

  const [product, setProduct] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function submitDataProduct(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('category', newData.cate);
    formData.append('title', newData.title), formData.append('location', newData.location);
    formData.append('status_investment', newData.statusInvestment);
    formData.append('total_invesment', newData.totalInvesment);
    formData.append('complete_invesment', newData.completeInvesment);
    formData.append('minimum_invesment', newData.minimumInvesment);
    formData.append('total_lot', newData.totalLot);
    formData.append('total_investor', newData.totalInvestor);
    formData.append('remaining_days', newData.remainingDays);
    formData.append('business_id', newData.businessId);
    formData.append('product_image', newData.productImage);
    formData.append('status_campaign', newData.statusCampaign);
    formData.append('product_detail_id', newData.productDetailId);
    formData.append('createdAt', newData.createdAt);

    await axiosNew
      .post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      });
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
              marginBottom: '10',
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
              label="Category"
              type="text"
              onChange={(e) => setNewData({ ...newData, category: e.target.value })}
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
            <TextField
              required
              id="outlined"
              label="Location"
              type="text"
              onChange={(e) => setNewData({ ...newData, location: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Status Invesment"
              type="number"
              onChange={(e) => setNewData({ ...newData, statusInvestment: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Invesment"
              type="number"
              onChange={(e) => setNewData({ ...newData, totalInvesment: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Complete Invesment"
              type="number"
              onChange={(e) => setNewData({ ...newData, completeInvesment: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Minimum Invesment"
              type="number"
              onChange={(e) => setNewData({ ...newData, minimumInvesment: e.target.value })}
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
            <TextField
              required
              id="outlined"
              label="Business ID"
              type="number"
              onChange={(e) => setNewData({ ...newData, businessId: e.target.value })}
              style={textFieldStyle}
            />
            <TextField
              required
              accept="image/*"
              type="file"
              onChange={(e) => setNewData({ ...newData, productImage: e.target.files[0] })}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Status Campaign"
              type="number"
              onChange={(e) => setNewData({ ...newData, statusCampaign: e.target.value })}
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
              onClick={(e) => submitDataProduct(e)}
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
