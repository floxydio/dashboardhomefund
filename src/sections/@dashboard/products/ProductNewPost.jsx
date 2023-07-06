import { useState, useEffect } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import Iconify from '../../../components/iconify';
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

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
};
export default function ProductNewPost() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [statusInvesment, setStatusInvesment] = useState(0);
  const [totalInvesment, setTotalInvesment] = useState(0);
  const [completeInvesment, setCompleteInvesment] = useState(0);
  const [minimumInvesment, setMinimumInvesment] = useState(0);
  const [totalLot, setTotalLot] = useState(0);
  const [totalInvestor, setTotalInvestor] = useState(0);
  const [remainingDays, setRemainingDays] = useState(new Date());
  const [businessId, setBusinessId] = useState(0);
  const [productImage, setProductImage] = useState('');
  const [statusCampaign, setStatusCampaign] = useState(0);
  const [longtitude, setLongtitude] = useState('');
  const [langtitude, setLangtitude] = useState('');
  const [tenor, setTenor] = useState(0);
  const [percentageImbal, setPercentageImbal] = useState(0.0);
  const [detail, setDetail] = useState('');
  const [productDetailId, setProductDetailId] = useState(0);
  const [createdAt, setCreatedAt] = useState(new Date());
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [viewProduct, setViewProduct] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = (acceptedFile) => {
    setSelectedFile(acceptedFile[0]);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function submitDataProduct(e) {
    e.preventDefault();

    await axiosNew.post(
      '/product',
      {
        category: category,
        title: title,
        location: location,
        status_invesment: statusInvesment,
        total_invesment: totalInvesment,
        complete_invesment: completeInvesment,
        minimum_invesment: minimumInvesment,
        total_lot: totalLot,
        total_investor: totalInvestor,
        remaining_days: remainingDays,
        business_id: businessId,
        product_image: productImage,
        status_campaign: statusCampaign,
        // longtitude: longtitude,
        // langtitude: langtitude,
        // tenor: tenor,
        // percentage_imbal: percentageImbal,
        // detail: detail,
        product_detail_id: productDetailId,
        createdAt: createdAt,
        updatedAt: updatedAt,
        // view_product:
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  function selectedDate() {
    setRemainingDays();
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
          overflow: 'scroll',
        }}
        aria-labelledby="scrollable-modal-title"
      >
        <Box sx={boxStyle} noValidate autoComplete="off">
          <Typography id="scrollable-modal-title" variant="h6">
            Masukan Data Product
          </Typography>
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              required
              id="outlined"
              label="Category"
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Location"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Status Invesment"
              type="number"
              onChange={(e) => setStatusInvesment(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Invesment"
              type="number"
              onChange={(e) => setTotalInvesment(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Complete Invesment"
              type="number"
              onChange={(e) => setCompleteInvesment(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Minimum Invesment"
              type="number"
              onChange={(e) => setMinimumInvesment(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Lot"
              type="number"
              onChange={(e) => setTotalLot(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Investor"
              type="number"
              onChange={(e) => setTotalInvestor(e.target.value)}
              style={textFieldStyle}
            />
            //Remaining Days Belum
            <TextField
              required
              id="outlined"
              label="Business ID"
              type="number"
              onChange={(e) => setBusinessId(e.target.value)}
              style={textFieldStyle}
            />
            //Product Image Belum
            <TextField
              required
              id="outlined"
              label="Status Campaign"
              type="number"
              onChange={(e) => setStatusCampaign(e.target.value)}
              style={textFieldStyle}
            />
          
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}
