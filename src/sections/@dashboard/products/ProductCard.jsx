import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import { BarLoader } from 'react-spinners';

// ----------------------------------------------------------------------

export default function ShopProductCard() {
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [editId, setEditId] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editStatusInvesment, setEditStatusInvesment] = useState(0);
  const [editTotalInvesment, setEditTotalInvesment] = useState(0);
  const [editCompleteInvesment, setEditCompleteInvesment] = useState(0);
  const [editMinimumInvesment, setEditMinimumInvesment] = useState(0);
  const [editTotalLot, setEditTotalLot] = useState(0);
  const [editTotalInvestor, setEditTotalInvestor] = useState(0);
  const [editRemainingDays, setEditRemainingDays] = useState(new Date());
  const [editBusinessId, setEditBusinessId] = useState(0);
  const [editProductImage, setEditProductImage] = useState('');
  const [editStatusCampaign, setEditStatusCampaign] = useState(0);
  const [editProductDetailId, setEditProductDetailId] = useState(0);
  const [editUpdatedAt, setEditUpdatedAt] = useState(new Date());

  function handleOpen(image) {
    setOpen(true);
  }

  function handleEditProduct(
    id,
    category,
    title,
    location,
    status_invesment,
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
    setEditId(id);
    setEditCategory(category);
    setEditTitle(title);
    setEditLocation(location);
    setEditStatusInvesment(status_invesment);
    setEditTotalInvesment(total_invesment);
    setEditCompleteInvesment(complete_invesment);
    setEditMinimumInvesment(minimum_invesment);
    setEditTotalLot(total_lot);
    setEditTotalInvesment(total_invesment);
    setEditTotalInvestor(total_investor);
    setEditRemainingDays(remaining_days);
    setEditBusinessId(business_id);
    setEditProductImage(product_image);
    setEditStatusCampaign(status_campaign);
    setEditProductDetailId(product_detail_id);
    setEditUpdatedAt(updatedAt);
  }
  const handleClose = () => setOpen(false);

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

  const override = {
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    position: 'absolute',
  };

  useEffect(() => {
    async function getProduct() {
      await axiosNew.get('/product').then((result) => {
        setDataProduct(result.data.data);
        console.log(result.data.data);
      });
    }
    getProduct();
  }, []);

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
                  <TableCell align="left">{result.remaining_days}</TableCell>
                  <TableCell align="left">{result.business_id}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleOpen(result.product_image)}>
                      <InsertDriveFileIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">{result.status_campaign}</TableCell>
                  <TableCell align="left">{result.product_detail_id}</TableCell>
                  <TableCell align="left">{result.createdAt}</TableCell>
                  <TableCell align="left">{result.updatedAt}</TableCell>
                  <TableCell align="left">
                    <Button onClick="">
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
            <img src={`http://103.250.11.249:3000/dashboard-api/static/product`} alt="Image Should be Here" />
          )}
        </Box>
      </Modal>
    </>
  );
}
