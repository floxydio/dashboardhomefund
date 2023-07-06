import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { BarLoader } from 'react-spinners';
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Button,
  Modal,
  FormControl,
  TextField,
} from '@mui/material';

//
import { useEffect, useState } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from 'axios';

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
  p: 4,
};

const override = {
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  position: 'absolute',
};

// ----------------------------------------------------------------------

export default function BlogPostCard() {
  const [slider, setSlider] = useState([]);
  const [imageSlider, setImageSlider] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleOpen(image) {
    setOpen(true);
    setImageSlider(image);
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setLoading(true);
    async function getSlider() {
      await axiosNew.get('/slider').then((result) => {
        setSlider(result.data.data);
        setLoading(false);
      });
    }
    getSlider();
  }, []);

  // const POST_INFO = [
  //   { number: comment, icon: 'eva:message-circle-fill' },
  //   { number: view, icon: 'eva:eye-fill' },
  //   { number: share, icon: 'eva:share-fill' },
  // ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slider.map((result, i) => {
              return (
                <TableRow
                  sx={{
                    '&:last-child td, &:lastchild th': { border: 0 },
                  }}
                  key={result.id}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{result.name}</TableCell>
                  <TableCell align="left">{result.detail}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleOpen(result.image)}>
                      <InsertDriveFileIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">{result.status}</TableCell>
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
            <img
              src={`https://dev.homefund-id.tech/dashboard-api/static/slider/${imageSlider}`}
              alt="Static API Image"
            />
          )}
        </Box>
      </Modal>
    </>
  );
}